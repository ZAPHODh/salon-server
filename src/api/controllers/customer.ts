import { prisma } from '../../../lib/prisma';
import { asyncHandler } from '../../helper'
import { calculateRetentionRate, processData } from '../services/customer-data';
import { generateUniqueSlug } from '../services/slug';

interface CreateCustomerBody {
    name: string;
    city?: string;
    address?: string;
    genre?: string;
    phone?: string;
    email?: string;
    birthDay?: Date;
}



export const customerController = {
    createCustomer: asyncHandler(async (req, res) => {
        const body: CreateCustomerBody = req.body;
        const slug = await generateUniqueSlug(body.name, prisma.customer)
        const customer = await prisma.customer.create({
            data: {
                ...body,
                salonId:req.user.salons[0].id,
                slug
            }
        });
        res.status(201).json(customer);
    }),

    getCustomer: asyncHandler(async (req, res) => {
        const { slug } = req.params;
        const customer = await prisma.customer.findFirst({
            where: { slug },
            include: {
                sales: true,
                appointments: true,
                services: true,
                transactions: true
            }
        });
        res.json(customer);
    }),

    updateCustomer: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const body: Partial<CreateCustomerBody> = req.body;

        const updatedCustomer = await prisma.customer.update({
            where: { id },
            data: body
        });
        res.json(updatedCustomer);
    }),

    deleteCustomer: asyncHandler(async (req, res) => {
        const { id } = req.params;
        await prisma.customer.delete({ where: { id } });
        res.status(204).send();
    }),

    listCustomers: asyncHandler(async (req, res) => {
        const salonId = req.user.salonId;
        const customers = await prisma.customer.findMany({
            where: { salonId },
            orderBy: { name: 'asc' }
        });
        res.json(customers);
    }),
    createManyCustomers: asyncHandler(async (req, res) => {
        const body: CreateCustomerBody[] = req.body;
        const slugfiedBody = await Promise.all(
            body.map(async (customer) => {
                const slug = await generateUniqueSlug(customer.name, prisma.customer);
                return { ...customer, slug };
            })
        );
        const createdCustomers = await prisma.customer.createMany({
            data: slugfiedBody.map(customer => ({
                ...customer,
                salonId:req.user.salons[0].id,
            })),
            skipDuplicates: true, 
        });

        res.status(201).json({
            message: 'Clientes criados com sucesso',
            count: createdCustomers.count
        });
    }),
    getCustomerAnalytics: asyncHandler(async (req, res) => {
        const salonId = req.user.salonId;
        const { professionalId, start, end } = req.query;

        // Filtro de datas
        const startDate = start ? new Date(String(start)) : new Date(new Date().setDate(1));
        const endDate = end ? new Date(String(end)) : new Date();

        // Dados básicos para gráficos
        const [topByVisits, topBySpending, newCustomers] = await Promise.all([
            // Top clientes por visitas
            prisma.sale.groupBy({
                by: ["customerId"],
                where: {
                    salonId,
                    professionalId: professionalId?.toString(),
                    AND: [
                        { createdAt: { gte: startDate } },
                        { createdAt: { lte: endDate } }
                    ]
                },
                _count: { customerId: true },
                orderBy: { _count: { customerId: "desc" } },
                take: 5,
            }),


            prisma.sale.groupBy({
                by: ["customerId"],
                where: {
                    salonId,
                    professionalId: professionalId?.toString(),
                    createdAt: { gte: startDate, lte: endDate }
                },
                _sum: { totalAmount: true },
                orderBy: { _sum: { totalAmount: "desc" } },
                take: 5,
            }),

            prisma.customer.count({
                where: {
                    salonId,
                    createdAt: { gte: startDate, lte: endDate }
                }
            })
        ]);


        const [visitsData, spendingData] = await Promise.all([
            processData(topByVisits, 'visits'),
            processData(topBySpending, 'spending')
        ]);

        res.json({
            topVisits: visitsData,
            topSpending: spendingData,
            newCustomers,
            retentionRate: await calculateRetentionRate(salonId, startDate, endDate)
        });
    })
};


import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processData = async (groupedData: any[], type: 'visits' | 'spending') => {
    const customerIds = groupedData.map(item => item.customerId);
    const details = await getCustomerDetails(customerIds);

    return groupedData.map(item => ({
        ...details.find(c => c.id === item.customerId),
        value: type === 'visits'
            ? item._count.customerId
            : item._sum.totalAmount?.toFixed(2) || 0
    }));
};

const getCustomerDetails = async (ids: string[]) => {
    return prisma.customer.findMany({
        where: { id: { in: ids } },
        select: {
            id: true,
            name: true,
            email: true,
            city: true,
            genre: true
        }
    });
};
// Lógica auxiliar para cálculo de retenção
export async function calculateRetentionRate(salonId: string, start: Date, end: Date) {
    // Implementação complexa que depende do seu modelo de negócios
    // Exemplo simplificado:
    const totalCustomers = await prisma.customer.count({ where: { salonId } });
    return totalCustomers > 0
        ? (await prisma.customer.count({
            where: {
                salonId,
                appointments: { some: { createdAt: { gte: start, lte: end } } }
            }
        })) / totalCustomers
        : 0;
}
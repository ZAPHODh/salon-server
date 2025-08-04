import { prisma } from "../../../lib/prisma"
import { asyncHandler } from "../../helper"

export const SalesController = {
  getAll: asyncHandler(async (req, res) => {
    const salonId = req.user.salons[0].id;
    const { from, to, professionalId } = req.query

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = { salonId }

    if (from || to) {
      whereClause.createdAt = {}
      if (from) whereClause.createdAt.gte = new Date(String(from))
      if (to) whereClause.createdAt.lte = new Date(String(to))
    }

    if (professionalId) {
      whereClause.professionalId = String(professionalId)
    }

    const sales = await prisma.sale.findMany({
      where: whereClause,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        professional: {
          select: {
            id: true,
            name: true,
          },
        },
        items: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
        paymentMethod: {
          select: {
            id: true,
            name: true,
          },
        },
        transaction: {
          select: {
            id: true,
            amount: true,
            type: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    res.json({ sales })
  }),

  create: asyncHandler(async (req, res) => {
    const salonId = req.user.salons[0].id;
    const { items, ...saleData } = req.body

    const sale = await prisma.$transaction(async (tx) => {
      const newSale = await tx.sale.create({
        data: {
          ...saleData,
          salonId,
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          professional: {
            select: {
              id: true,
              name: true,
            },
          },
          paymentMethod: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      if (items && items.length > 0) {
        await tx.saleItem.createMany({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: items.map((item: any) => ({
            ...item,
            saleId: newSale.id,
          })),
        })
      }

      const financialAccount =
        (await tx.financialAccount.findFirst({
          where: { salonId },
        })) ||
        (await tx.financialAccount.create({
          data: {
            salonId,
            balance: 0,
            currency: "BRL",
          },
        }))

      const transaction = await tx.transaction.create({
        data: {
          accountId: financialAccount.id,
          type: "income",
          amount: newSale.totalAmount,
          category: "sale",
          description: `Venda #${newSale.id}`,
          date: newSale.createdAt,
          customerId: newSale.customerId,
          professionalId: newSale.professionalId,
        },
      })

      await tx.sale.update({
        where: { id: newSale.id },
        data: { transactionId: transaction.id },
      })
      await tx.financialAccount.update({
        where: { id: financialAccount.id },
        data: {
          balance: {
            increment: newSale.totalAmount,
          },
        },
      })

      return newSale
    })

    const completeSale = await prisma.sale.findUnique({
      where: { id: sale.id },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        professional: {
          select: {
            id: true,
            name: true,
          },
        },
        items: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
        paymentMethod: {
          select: {
            id: true,
            name: true,
          },
        },
        transaction: {
          select: {
            id: true,
            amount: true,
            type: true,
          },
        },
      },
    })

    res.status(201).json({ sale: completeSale })
  }),
}

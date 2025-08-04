import { prisma } from "../../../lib/prisma"
import { asyncHandler } from "../../helper"

export const CommissionsController = {
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

    const commissions = await prisma.commission.findMany({
      where: whereClause,
      include: {
        professional: {
          select: {
            id: true,
            name: true,
            commissionRate: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    res.json({ commissions })
  }),
  create: asyncHandler(async (req, res) => {
    const salonId = req.user.salons[0].id;
    const commissionData = { ...req.body, salonId }

    const commission = await prisma.$transaction(async (tx) => {
      const newCommission = await tx.commission.create({
        data: commissionData,
        include: {
          professional: {
            select: {
              id: true,
              name: true,
              commissionRate: true,
            },
          },
        },
      })
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

      await tx.transaction.create({
        data: {
          accountId: financialAccount.id,
          type: "expense",
          amount: newCommission.amount,
          category: "commission",
          description: `Comissão - ${newCommission.professional.name}`,
          date: newCommission.createdAt,
          professionalId: newCommission.professionalId,
        },
      })
      await tx.financialAccount.update({
        where: { id: financialAccount.id },
        data: {
          balance: {
            decrement: newCommission.amount,
          },
        },
      })

      return newCommission
    })

    res.status(201).json({ commission })
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salons[0].id;

    const commission = await prisma.commission.update({
      where: {
        id,
        salonId,
      },
      data: req.body,
      include: {
        professional: {
          select: {
            id: true,
            name: true,
            commissionRate: true,
          },
        },
      },
    })

    res.json({ commission })
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salons[0].id;

    await prisma.commission.delete({
      where: {
        id,
        salonId,
      },
    })

    res.status(204).send()
  }),
}

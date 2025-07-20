import { prisma } from "../../../lib/prisma"
import { asyncHandler } from "../../helper"

export const TransactionsController = {
  getAll: asyncHandler(async (req, res) => {
    const salonId = req.user.salonId
    const { from, to } = req.query

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      financialAccount: {
        salonId: salonId,
      },
    }

    if (from || to) {
      whereClause.date = {}
      if (from) whereClause.date.gte = new Date(String(from))
      if (to) whereClause.date.lte = new Date(String(to))
    }

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      include: {
        financialAccount: true,
        Professional: {
          select: {
            id: true,
            name: true,
          },
        },
        Customer: {
          select: {
            id: true,
            name: true,
          },
        },
        Sale: {
          select: {
            id: true,
            totalAmount: true,
          },
        },
      },
      orderBy: { date: "desc" },
    })

    res.json({ transactions })
  }),
  create: asyncHandler(async (req, res) => {
    const salonId = req.user.salonId

    let financialAccount = await prisma.financialAccount.findFirst({
      where: { salonId },
    })

    if (!financialAccount) {
      financialAccount = await prisma.financialAccount.create({
        data: {
          salonId,
          balance: 0,
          currency: "BRL",
        },
      })
    }

    const transactionData = {
      ...req.body,
      accountId: financialAccount.id,
      date: req.body.date ? new Date(req.body.date) : new Date(),
    }

    const transaction = await prisma.transaction.create({
      data: transactionData,
      include: {
        financialAccount: true,
        Professional: {
          select: {
            id: true,
            name: true,
          },
        },
        Customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    const balanceChange = transaction.type === "income" ? transaction.amount : -transaction.amount
    await prisma.financialAccount.update({
      where: { id: financialAccount.id },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    })

    res.status(201).json({ transaction })
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salonId

    const oldTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        financialAccount: {
          salonId,
        },
      },
      include: {
        financialAccount: true,
      },
    })

    if (!oldTransaction) {
       res.status(404).json({ error: "Transaction not found" })
       return
    }

    const updateData = {
      ...req.body,
      date: req.body.date ? new Date(req.body.date) : undefined,
    }

    const transaction = await prisma.transaction.update({
      where: { id },
      data: updateData,
      include: {
        financialAccount: true,
        Professional: {
          select: {
            id: true,
            name: true,
          },
        },
        Customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    if (req.body.amount !== undefined || req.body.type !== undefined) {
      const oldBalanceChange = oldTransaction.type === "income" ? oldTransaction.amount : -oldTransaction.amount
      const newBalanceChange = transaction.type === "income" ? transaction.amount : -transaction.amount
      const balanceDifference = newBalanceChange - oldBalanceChange

      await prisma.financialAccount.update({
        where: { id: oldTransaction.accountId },
        data: {
          balance: {
            increment: balanceDifference,
          },
        },
      })
    }

    res.json({ transaction })
  }),

  // DELETE /api/v1/transactions/:id
  delete: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salonId

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        financialAccount: {
          salonId,
        },
      },
      include: {
        financialAccount: true,
      },
    })

    if (!transaction) {
       res.status(404).json({ error: "Transaction not found" })
       return
    }

    await prisma.transaction.delete({
      where: { id },
    })

    const balanceChange = transaction.type === "income" ? -transaction.amount : transaction.amount
    await prisma.financialAccount.update({
      where: { id: transaction.accountId },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    })

    res.status(204).send()
  }),
}

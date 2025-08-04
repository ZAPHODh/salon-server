import { prisma } from "../../../lib/prisma"
import { asyncHandler } from "../../helper"

export const ExpensesController = {
  getAll: asyncHandler(async (req, res) => {
    const salonId = req.user.salons[0].id;
    const { from, to } = req.query

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = { salonId }

    if (from || to) {
      whereClause.date = {}
      if (from) whereClause.date.gte = new Date(String(from))
      if (to) whereClause.date.lte = new Date(String(to))
    }

    const expenses = await prisma.expense.findMany({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { date: "desc" },
    })

    res.json({ expenses })
  }),

  create: asyncHandler(async (req, res) => {
    const salonId = req.user.salons[0].id;
    const expenseData = {
      ...req.body,
      salonId,
      date: req.body.date ? new Date(req.body.date) : new Date(),
    }

    const expense = await prisma.$transaction(async (tx) => {
      const newExpense = await tx.expense.create({
        data: expenseData,
        include: {
          category: {
            select: {
              id: true,
              name: true,
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
          amount: newExpense.amount,
          category: "expense",
          description: newExpense.description,
          date: newExpense.date,
        },
      })

      await tx.financialAccount.update({
        where: { id: financialAccount.id },
        data: {
          balance: {
            decrement: newExpense.amount,
          },
        },
      })

      return newExpense
    })

    res.status(201).json({ expense })
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salons[0].id;
    const updateData = {
      ...req.body,
      date: req.body.date ? new Date(req.body.date) : undefined,
    }

    const expense = await prisma.expense.update({
      where: {
        id,
        salonId,
      },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    res.json({ expense })
  }),
  delete: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salons[0].id;

    await prisma.expense.delete({
      where: {
        id,
        salonId,
      },
    })

    res.status(204).send()
  }),
}

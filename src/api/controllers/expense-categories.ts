import { prisma } from "../../../lib/prisma"
import { asyncHandler } from "../../helper"

export const ExpenseCategoriesController = {
  getAll: asyncHandler(async (req, res) => {
    const salonId = req.user.salonId
    const categories = await prisma.expenseCategory.findMany({
      where: { salonId },
      include: {
        _count: {
          select: {
            expenses: true,
          },
        },
      },
      orderBy: { name: "asc" },
    })

    res.json({ categories })
  }),

  create: asyncHandler(async (req, res) => {
    const salonId = req.user.salonId
    const categoryData = { ...req.body, salonId }

    const category = await prisma.expenseCategory.create({
      data: categoryData,
      include: {
        _count: {
          select: {
            expenses: true,
          },
        },
      },
    })

    res.status(201).json({ category })
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salonId

    const category = await prisma.expenseCategory.update({
      where: {
        id,
        salonId,
      },
      data: req.body,
      include: {
        _count: {
          select: {
            expenses: true,
          },
        },
      },
    })

    res.json({ category })
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salonId

    const expensesCount = await prisma.expense.count({
      where: {
        categoryId: id,
        salonId,
      },
    })

    if (expensesCount > 0) {
       res.status(400).json({
        error: "Cannot delete category",
        message: "This category is being used in expenses",
      })
      return
    }

    await prisma.expenseCategory.delete({
      where: {
        id,
        salonId,
      },
    })

    res.status(204).send()
  }),
}

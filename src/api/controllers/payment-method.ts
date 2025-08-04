import { prisma } from "../../../lib/prisma"
import { asyncHandler } from "../../helper"

export const PaymentMethodsController = {
  getAll: asyncHandler(async (req, res) => {
    const salonId = req.user.salons[0].id;

    const paymentMethods = await prisma.paymentMethod.findMany({
      where: { salonId },
      orderBy: { name: "asc" },
    })

    res.json({ paymentMethods })
  }),

  create: asyncHandler(async (req, res) => {
    const salonId = req.user.salons[0].id;
    const paymentMethodData = { ...req.body, salonId }

    const paymentMethod = await prisma.paymentMethod.create({
      data: paymentMethodData,
    })

    res.status(201).json({ paymentMethod })
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salons[0].id;

    const paymentMethod = await prisma.paymentMethod.update({
      where: {
        id,
        salonId,
      },
      data: req.body,
    })

    res.json({ paymentMethod })
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.params
    const salonId = req.user.salons[0].id;

    const salesCount = await prisma.sale.count({
      where: {
        paymentMethodId: id,
        salonId,
      },
    })

    if (salesCount > 0) {
       res.status(400).json({
        error: "Cannot delete payment method",
        message: "This payment method is being used in sales",
      })
      return
    }

    await prisma.paymentMethod.delete({
      where: {
        id,
        salonId,
      },
    })

    res.status(204).send()
  }),
}

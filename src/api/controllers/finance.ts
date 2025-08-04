import { groupSalesByMonth } from "../../../lib/helper"
import { prisma } from "../../../lib/prisma"
import { asyncHandler } from "../../helper"

export const FinanceController = {
  get: asyncHandler(async (req, res) => {
    const salonId = req.user.salons[0].id;
    const { from, to, professionalId } = req.query
    
    const startDate = from ? new Date(String(from)) : new Date(new Date().getFullYear(), 0, 1)
    const endDate = to ? new Date(String(to)) : new Date()

    const sales = await prisma.sale.findMany({
      where: {
        salonId,
        createdAt: { gte: startDate, lte: endDate },
        professionalId: professionalId ? String(professionalId) : undefined,
      },
      select: {
        totalAmount: true,
        createdAt: true,
        customer: { select: { name: true, email: true } },
      },
    })

    const expenses = await prisma.expense.findMany({
      where: {
        salonId,
        date: { gte: startDate, lte: endDate },
      },
      select: {
        amount: true,
        date: true,
      },
    })

    const commissions = await prisma.commission.findMany({
      where: {
        salonId,
        createdAt: { gte: startDate, lte: endDate },
      },
      select: {
        amount: true,
        createdAt: true,
      },
    })

    const financialAccount = await prisma.financialAccount.findFirst({
      where: { salonId },
      select: { balance: true },
    })

    const recentSales = sales
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map((s) => ({
        name: s.customer?.name ?? "—",
        email: s.customer?.email ?? "",
        value: s.totalAmount,
      }))

    const groupedSales = groupSalesByMonth(sales)
    const totalRevenue = sales.reduce((acc, s) => acc + s.totalAmount, 0)
    const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0)
    const totalCommissions = commissions.reduce((acc, c) => acc + c.amount, 0)

    res.json({
      totalRevenue,
      totalSales: sales.length,
      totalExpenses,
      totalCommissions,
      netProfit: totalRevenue - totalExpenses - totalCommissions,
      currentBalance: financialAccount?.balance || 0,
      groupedSales,
      recentSales,
    })
  }),
}

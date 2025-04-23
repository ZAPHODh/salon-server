import { groupSalesByMonth } from "../../../lib/helper";
import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";

export const FinanceController = {
  get: asyncHandler(async (req, res) => {
    const salonId = req.user.salonId;
    const { start, end, professionalId } = req.query;

    const startDate = start ? new Date(String(start)) : new Date(new Date().getFullYear(), 0, 1);
    const endDate = end ? new Date(String(end)) : new Date();

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
    });

    const recentSales = sales
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map((s) => ({
        name: s.customer?.name ?? "—",
        email: s.customer?.email ?? "",
        value: s.totalAmount,
      }));

    const groupedSales = groupSalesByMonth(sales);

     res.json({
      totalRevenue: sales.reduce((acc, s) => acc + s.totalAmount, 0),
      totalSales: sales.length,
      groupedSales,
      recentSales,
    });
    return
  })
};
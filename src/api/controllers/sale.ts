import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";

export const saleController = {
    createSale: asyncHandler(async (req, res) => {
      const { items, ...saleData } = req.body;
      
      const sale = await prisma.$transaction(async (tx) => {
        const createdSale = await tx.sale.create({
          data: {
            ...saleData,
            items: {
              create: items
            }
          },
          include: { items: true }
        });
        
        // Atualizar estoque para produtos
        for (const item of items.filter((i: { productId: string; }) => i.productId)) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          });
        }
        
        return createdSale;
      });
  
      res.status(201).json(sale);
    }),
  
    getSale: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const sale = await prisma.sale.findUnique({
        where: { id },
        include: { items: true, customer: true, professional: true }
      });
      res.json(sale);
    }),
  
    listSales: asyncHandler(async (req, res) => {
      const { salonId } = req.user;
      const sales = await prisma.sale.findMany({
        where: { salonId: salonId as string }
      });
      res.json(sales);
    })
  };
  
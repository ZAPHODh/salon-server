import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";

export const inventoryController = {
    createMovement: asyncHandler(async (req, res) => {
      const { productId, quantity, type, reason } = req.body;
      
      const movement = await prisma.$transaction(async (tx) => {
        const createdMovement = await tx.inventoryMovement.create({
          data: { productId, quantity, type, reason }
        });
  
        await tx.product.update({
          where: { id: productId },
          data: { 
            stock: type === 'entry' ? { increment: quantity } : { decrement: quantity }
          }
        });
  
        return createdMovement;
      });
  
      res.status(201).json(movement);
    }),
  
    getProductStock: asyncHandler(async (req, res) => {
      const { productId } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { stock: true }
      });
      res.json(product?.stock ?? 0);
    })
  };
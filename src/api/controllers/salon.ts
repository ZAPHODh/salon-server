import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";
import { CreateSalonBody } from "../../interfaces";

export const salonController = {
    createSalon: asyncHandler(async (req, res) => {
      const body: CreateSalonBody = req.body;
      const salon = await prisma.salon.create({
        data: body
      });
      res.status(201).json(salon);
    }),
  
    getSalon: asyncHandler(async (req, res) => {
      const { id } = req.user;
      const salon = await prisma.salon.findUnique({
        where: { id },
        include: { owner: true }
      });
      res.json(salon);
    }),
  
    updateSalon: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const body: Partial<CreateSalonBody> = req.body;
      const updatedSalon = await prisma.salon.update({
        where: { id },
        data: body
      });
      res.json(updatedSalon);
    }),
  
    deleteSalon: asyncHandler(async (req, res) => {
      const { id } = req.params;
      await prisma.salon.delete({ where: { id } });
      res.status(204).send();
    }),
  
    listSalons: asyncHandler(async (req, res) => {
      const salons = await prisma.salon.findMany();
      res.json(salons);
    }),
}
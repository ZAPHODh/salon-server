import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";
import { CreateProfessionalBody } from "../../interfaces";

export const professionalController = {
    createProfessional: asyncHandler(async (req, res) => {
      const body: CreateProfessionalBody = req.body;
      const professional = await prisma.professional.create({
        data: body
      });
      res.status(201).json(professional);
    }),
  
    getProfessional: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const professional = await prisma.professional.findUnique({
        where: { id },
        include: { salon: true, services: true }
      });
      res.json(professional);
    }),
  
    updateProfessional: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const body: Partial<CreateProfessionalBody> = req.body;
      const updatedProfessional = await prisma.professional.update({
        where: { id },
        data: body
      });
      res.json(updatedProfessional);
    }),
  
    deleteProfessional: asyncHandler(async (req, res) => {
      const { id } = req.params;
      await prisma.professional.delete({ where: { id } });
      res.status(204).send();
    }),
  
    listProfessionals: asyncHandler(async (req, res) => {
      const { salonId } = req.query;
      const professionals = await prisma.professional.findMany({
        where: { salonId: salonId as string }
      });
      res.json(professionals);
    })
  };
  
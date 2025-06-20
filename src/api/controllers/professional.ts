import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";
import { CreateProfessionalBody } from "../../interfaces";
import { generateUniqueSlug } from "../services/slug";

export const professionalController = {
    createProfessional: asyncHandler(async (req, res) => {
      const body: CreateProfessionalBody = req.body;
      const slug = await generateUniqueSlug(body.name)
      const professional = await prisma.professional.create({
        data: { ...body, salonId: req.user.salons[0].id as string,slug},
      });
      res.status(201).json(professional);
    }),
  
    getProfessional: asyncHandler(async (req, res) => {
      const { slug } = req.params;
      const professional = await prisma.professional.findFirst({
        where: { slug },
        include: { salon: true, services: true, appointments: true, Sale: true, commissions: true}
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
      const { salons } = req.user;
      const professionals = await prisma.professional.findMany({
        where: { salonId: salons[0].id as string }
      });
      res.json(professionals);
    })
  };
  
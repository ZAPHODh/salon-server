import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";
import { CreateServiceBody } from "../../interfaces";

export const serviceController = {
    createService: asyncHandler(async (req, res) => {
      const body: CreateServiceBody = req.body;
      const service = await prisma.service.create({
        data: body
      });
      res.status(201).json(service);
    }),
  
    getService: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const service = await prisma.service.findUnique({
        where: { id },
        include: { salon: true, professional: true }
      });
      res.json(service);
    }),
  
    updateService: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const body: Partial<CreateServiceBody> = req.body;
      const updatedService = await prisma.service.update({
        where: { id },
        data: body
      });
      res.json(updatedService);
    }),
  
    deleteService: asyncHandler(async (req, res) => {
      const { id } = req.params;
      await prisma.service.delete({ where: { id } });
      res.status(204).send();
    }),
  
    listServices: asyncHandler(async (req, res) => {
      const { salonId } = req.query;
      const services = await prisma.service.findMany({
        where: { salonId: salonId as string }
      });
      res.json(services);
    })
  };
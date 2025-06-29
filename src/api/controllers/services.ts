import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";
import { CreateServiceBody } from "../../interfaces";

export const serviceController = {
    createService: asyncHandler(async (req, res) => {
      const body: CreateServiceBody = req.body;
      const service = await prisma.service.create({
        data: {...body,salonId: req.user.salons[0].id}
      });
      res.status(201).json(service);
    }),
  
    getService: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const service = await prisma.service.findUnique({
        where: { id },
        include: { salon: true, appointments:true}
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
      const services = await prisma.service.findMany({
        where: { salonId: req.user.salons[0].id }
      });
      res.json(services);
    })
  };
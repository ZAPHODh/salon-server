import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";
import { CreateAppointmentBody } from "../../interfaces";

export const appointmentController = {
    createAppointment: asyncHandler(async (req, res) => {
      const body: CreateAppointmentBody = req.body;
      const appointment = await prisma.appointment.create({
        data: {...body,salonId: req.user.salons[0].id},
      });
      res.status(201).json(appointment);
    }),
    getAppointment: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const appointment = await prisma.appointment.findUnique({
        where: { id },
        include: { salon: true, professional: true, customer: true, service: true }
      });
      res.json(appointment);
    }),
  
    updateAppointmentStatus: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const updatedAppointment = await prisma.appointment.update({
        where: { id },
        data: { status }
      });
      res.json(updatedAppointment);
    }),
  
    cancelAppointment: asyncHandler(async (req, res) => {
      const { id } = req.params;
      await prisma.appointment.delete({ where: { id } });
      res.status(204).send();
    }),
  
    listAppointments: asyncHandler(async (req, res) => {
      const { salonId } = req.user;
      const appointments = await prisma.appointment.findMany({
        where: {
          salonId: salonId as string,
        }
      });
      res.json(appointments);
    })
  };
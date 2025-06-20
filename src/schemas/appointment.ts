import { z } from "zod";

export const AppointmentStatusEnum = z.enum([
  'SCHEDULED',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',

]);
export const CreateAppointmentSchema = z.object({
  salonId: z.string().uuid(),
  professionalId: z.string().uuid(),
  customerId: z.string().uuid(),
  serviceId: z.string().uuid(),
  date: z.union([z.string().datetime(), z.date()]), 
  status: AppointmentStatusEnum,
  notes: z.string().optional(),
});
export const UpdateAppointmentSchema = z.object({
  salonId: z.string().uuid().optional(),
  professionalId: z.string().uuid().optional(),
  customerId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  date: z.union([z.string().datetime(), z.date()]).optional(),
  status: AppointmentStatusEnum.optional(),
  notes: z.string().optional(),
});

export type UpdateAppointmentDTO = z.infer<typeof UpdateAppointmentSchema>;
export type CreateAppointmentDTO = z.infer<typeof CreateAppointmentSchema>;
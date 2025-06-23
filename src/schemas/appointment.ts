import { z } from "zod";

export const AppointmentStatusEnum = z.enum([
  'SCHEDULED',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
]);
export const CreateAppointmentSchema = z.object({
  professionalId: z.string().uuid(),
  customerId: z.string().uuid(),
  serviceId: z.string().uuid(),
  startDate: z.string().datetime(),
  startTime: z.object({
    hour: z.number().int().min(0).max(23),
    minute: z.number().int().min(0).max(59),
  }),
  endDate: z.string().datetime(),
  endTime: z.object({
    hour: z.number().int().min(0).max(23),
    minute: z.number().int().min(0).max(59),
  }),
  status: AppointmentStatusEnum,
  notes: z.string().optional(),
});
export const UpdateAppointmentSchema = z.object({
  professionalId: z.string().uuid().optional(),
  customerId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
   startDate: z.string().datetime(),
  startTime: z.object({
    hour: z.number().int().min(0).max(23),
    minute: z.number().int().min(0).max(59),
  }),
  endDate: z.string().datetime(),
  endTime: z.object({
    hour: z.number().int().min(0).max(23),
    minute: z.number().int().min(0).max(59),
  }),
  status: AppointmentStatusEnum.optional(),
  notes: z.string().optional(),
});

export type UpdateAppointmentDTO = z.infer<typeof UpdateAppointmentSchema>;
export type CreateAppointmentDTO = z.infer<typeof CreateAppointmentSchema>;
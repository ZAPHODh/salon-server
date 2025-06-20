import { z } from "zod";

export const createProfessionalSchema = z.object({
    name: z.string().min(1),
    category: z.string().min(1),
    cpf: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    commissionRate: z.number(),
});

export const updateProfessionalSchema = z.object({
    id:z.string(),
    name: z.string().optional(),
    category: z.string().min(1),
    cpf: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    commissionRate: z.number(),
});

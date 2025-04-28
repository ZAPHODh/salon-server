import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z.string().min(1),
    city: z.string().optional(),
    address: z.string().optional(),
    genre: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    birthDay: z.date().optional()
});

export const updateCustomerSchema = z.object({
    id:z.string(),
    name: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    genre: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    birthDay: z.date().optional()
});

export const createManyCustomersSchema = z.array(createCustomerSchema);
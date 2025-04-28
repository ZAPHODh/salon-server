import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2,),
  email: z.string().email(),
  password: z.string().min(6,)
    .regex(/[A-Z]/)
    .regex(/[0-9]/),
});

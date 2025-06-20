import { z } from "zod"

export const salonConfigSchema = z.object({
    name: z.string().min(1, "Nome do salão é obrigatório"),
    address: z.string().min(1, "Endereço é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    countryCode: z.string().min(1, "País é obrigatório"),
    cep: z.string().min(1, "CEP é obrigatório"),
    workingHours: z.record(
        z.object({
            from: z.number(),
            to: z.number(),
        }),
    ),
    visibleHours: z.object({
        from: z.number(),
        to: z.number(),
    }),
})

export type SalonFormValues = z.infer<typeof salonConfigSchema>
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type ModelClient =
  | typeof prisma.professional
  | typeof prisma.customer;
  
export { prisma , ModelClient}
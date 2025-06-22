/*
  Warnings:

  - You are about to drop the column `customerId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `professional_id` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_customerId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_professional_id_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "customerId",
DROP COLUMN "professional_id",
ADD COLUMN     "professionalId" TEXT;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

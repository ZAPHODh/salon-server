/*
  Warnings:

  - You are about to drop the column `date` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "appointment_date_idx";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "date",
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "endTime" JSONB NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL,
ADD COLUMN     "startTime" JSONB NOT NULL;

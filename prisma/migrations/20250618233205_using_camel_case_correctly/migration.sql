/*
  Warnings:

  - You are about to drop the column `CommissionRate` on the `professionals` table. All the data in the column will be lost.
  - Added the required column `commissionRate` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionals" DROP COLUMN "CommissionRate",
ADD COLUMN     "commissionRate" INTEGER NOT NULL;

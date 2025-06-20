/*
  Warnings:

  - You are about to drop the `commission_rules` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CommissionRate` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "commission_rules" DROP CONSTRAINT "commission_rules_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "commission_rules" DROP CONSTRAINT "commission_rules_salon_id_fkey";

-- DropForeignKey
ALTER TABLE "commission_rules" DROP CONSTRAINT "commission_rules_service_id_fkey";

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "CommissionRate" INTEGER NOT NULL;

-- DropTable
DROP TABLE "commission_rules";

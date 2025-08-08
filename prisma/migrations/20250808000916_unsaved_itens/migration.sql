/*
  Warnings:

  - You are about to drop the `stripe_customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stripe_integrations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stripe_customers" DROP CONSTRAINT "stripe_customers_salon_id_fkey";

-- DropForeignKey
ALTER TABLE "stripe_customers" DROP CONSTRAINT "stripe_customers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "stripe_integrations" DROP CONSTRAINT "stripe_integrations_salon_id_fkey";

-- DropTable
DROP TABLE "stripe_customers";

-- DropTable
DROP TABLE "stripe_integrations";

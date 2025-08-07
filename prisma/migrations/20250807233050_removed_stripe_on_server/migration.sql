/*
  Warnings:

  - You are about to drop the column `subscription_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_status` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_customer_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "subscription_id",
DROP COLUMN "subscription_role",
DROP COLUMN "subscription_status",
ADD COLUMN     "stripe_current_period_end" TIMESTAMP(3),
ADD COLUMN     "stripe_customer_id" TEXT,
ADD COLUMN     "stripe_price_id" TEXT,
ADD COLUMN     "stripe_subscription_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");

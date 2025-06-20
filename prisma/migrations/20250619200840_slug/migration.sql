/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "professionals_slug_key" ON "professionals"("slug");

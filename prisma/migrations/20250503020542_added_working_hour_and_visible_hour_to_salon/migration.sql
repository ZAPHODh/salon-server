/*
  Warnings:

  - Added the required column `visible_hours` to the `salons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `working_hours` to the `salons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "salons" ADD COLUMN     "visible_hours" JSONB NOT NULL,
ADD COLUMN     "working_hours" JSONB NOT NULL;

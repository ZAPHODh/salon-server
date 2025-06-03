/*
  Warnings:

  - Added the required column `countryCode` to the `salons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "salons" ADD COLUMN     "countryCode" TEXT NOT NULL;

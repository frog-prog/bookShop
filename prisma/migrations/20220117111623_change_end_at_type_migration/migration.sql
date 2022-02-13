/*
  Warnings:

  - You are about to alter the column `endAt` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "endAt" SET DATA TYPE INTEGER;

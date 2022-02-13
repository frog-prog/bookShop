/*
  Warnings:

  - You are about to drop the column `address` on the `Book` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "address",
ADD COLUMN     "addressId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

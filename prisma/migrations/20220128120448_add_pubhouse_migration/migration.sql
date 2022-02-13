/*
  Warnings:

  - Added the required column `pubHouseId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pubYear` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "pubHouseId" INTEGER NOT NULL,
ADD COLUMN     "pubYear" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PubHouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PubHouse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_pubHouseId_fkey" FOREIGN KEY ("pubHouseId") REFERENCES "PubHouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

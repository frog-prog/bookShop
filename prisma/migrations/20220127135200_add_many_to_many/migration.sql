/*
  Warnings:

  - You are about to drop the column `genres` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genres";

-- CreateTable
CREATE TABLE "GenresOnBooks" (
    "bookId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "GenresOnBooks_pkey" PRIMARY KEY ("bookId","genreId")
);

-- AddForeignKey
ALTER TABLE "GenresOnBooks" ADD CONSTRAINT "GenresOnBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnBooks" ADD CONSTRAINT "GenresOnBooks_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

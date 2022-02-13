-- DropForeignKey
ALTER TABLE "GenresOnBooks" DROP CONSTRAINT "GenresOnBooks_bookId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnBooks" DROP CONSTRAINT "GenresOnBooks_genreId_fkey";

-- AddForeignKey
ALTER TABLE "GenresOnBooks" ADD CONSTRAINT "GenresOnBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnBooks" ADD CONSTRAINT "GenresOnBooks_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

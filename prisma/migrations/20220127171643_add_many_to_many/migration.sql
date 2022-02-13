-- DropForeignKey
ALTER TABLE "GenresOnBooks" DROP CONSTRAINT "GenresOnBooks_genreId_fkey";

-- AddForeignKey
ALTER TABLE "GenresOnBooks" ADD CONSTRAINT "GenresOnBooks_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

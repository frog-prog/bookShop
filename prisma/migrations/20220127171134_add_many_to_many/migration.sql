-- DropForeignKey
ALTER TABLE "GenresOnBooks" DROP CONSTRAINT "GenresOnBooks_bookId_fkey";

-- AddForeignKey
ALTER TABLE "GenresOnBooks" ADD CONSTRAINT "GenresOnBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

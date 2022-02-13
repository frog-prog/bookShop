-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "given" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

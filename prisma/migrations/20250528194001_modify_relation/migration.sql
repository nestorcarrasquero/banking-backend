/*
  Warnings:

  - You are about to drop the `MonedaToCriptomoneda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonedaToCriptomoneda" DROP CONSTRAINT "MonedaToCriptomoneda_criptomonedaId_fkey";

-- DropForeignKey
ALTER TABLE "MonedaToCriptomoneda" DROP CONSTRAINT "MonedaToCriptomoneda_monedaId_fkey";

-- DropTable
DROP TABLE "MonedaToCriptomoneda";

-- CreateTable
CREATE TABLE "_MonedaToCriptomoneda" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MonedaToCriptomoneda_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MonedaToCriptomoneda_B_index" ON "_MonedaToCriptomoneda"("B");

-- AddForeignKey
ALTER TABLE "_MonedaToCriptomoneda" ADD CONSTRAINT "_MonedaToCriptomoneda_A_fkey" FOREIGN KEY ("A") REFERENCES "Criptomoneda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonedaToCriptomoneda" ADD CONSTRAINT "_MonedaToCriptomoneda_B_fkey" FOREIGN KEY ("B") REFERENCES "Moneda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

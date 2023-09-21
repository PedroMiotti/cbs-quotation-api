/*
  Warnings:

  - The primary key for the `CompositionItems` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Composition" DROP CONSTRAINT "Composition_quotation_id_fkey";

-- AlterTable
ALTER TABLE "CompositionItems" DROP CONSTRAINT "CompositionItems_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CompositionItems_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "Quotation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

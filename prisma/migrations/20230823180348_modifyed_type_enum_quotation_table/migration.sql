-- CreateEnum
CREATE TYPE "QuotationType" AS ENUM ('CHRISTIMAS', 'CUSTOM');

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATE,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Composition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "margin" DECIMAL NOT NULL,
    "quotation_id" INTEGER NOT NULL,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATE,

    CONSTRAINT "Composition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompositionItems" (
    "product_id" INTEGER NOT NULL,
    "composition_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATE,

    CONSTRAINT "CompositionItems_pkey" PRIMARY KEY ("product_id","composition_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "brand_id" INTEGER NOT NULL,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATE,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrice" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATE,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "QuotationType" NOT NULL,
    "tag" TEXT,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATE,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "Quotation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompositionItems" ADD CONSTRAINT "CompositionItems_composition_id_fkey" FOREIGN KEY ("composition_id") REFERENCES "Composition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompositionItems" ADD CONSTRAINT "CompositionItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

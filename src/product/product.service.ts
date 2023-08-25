import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateProductPriceDto } from './dto/create-product-price.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.prisma.product.create({
      data: createProductDto,
      include: { ProductPrice: true, Brand: true },
    });

    await this.prisma.productPrice.create({
      data: {
        price: createProductDto.price.price,
        is_current: createProductDto.price.is_current,
        product_id: createdProduct.id,
      },
    });

    return createdProduct;
  }

  createPrice(createProductPriceDto: CreateProductPriceDto) {
    return this.prisma.productPrice.create({
      data: createProductPriceDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany({ include: { ProductPrice: true, Brand: true } });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
      include: { ProductPrice: true, Brand: true },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: updateProductDto,
      include: { ProductPrice: true, Brand: true },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateProductPriceDto } from './dto/create-product-price.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
      include: { ProductPrice: true, Brand: true },
    });
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

import { Injectable } from '@nestjs/common';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateCompositionItemDto } from './dto/create-composition-item.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompositionService {
  constructor(private prisma: PrismaService) {}
  
  create(createCompositionDto: CreateCompositionDto) {
    return this.prisma.composition.create({
      data: createCompositionDto,
    });

  }

  addItem(createCompositionItemDto: CreateCompositionItemDto) {
    return this.prisma.compositionItems.create({
      data: createCompositionItemDto,
    });
  }

 updateItem(productId: number, compositionId: number, quantity: number) {
    return this.prisma.compositionItems.update({
      where: {
        product_id_composition_id: {
          product_id: productId,
          composition_id: compositionId,
        }
      },
      data: { quantity },
    });
  }

  removeItem(productId: number, compositionId: number) {
    return this.prisma.compositionItems.delete({
      where: {
        product_id_composition_id: {
          product_id: productId,
          composition_id: compositionId,
        }
      },
    });
  }

  findAll() {
    return this.prisma.composition.findMany();
  }

  findOne(id: number) {
    return this.prisma.composition.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCompositionDto: UpdateCompositionDto) {
    return this.prisma.composition.update({
      where: {
        id: id,
      },
      data: updateCompositionDto,
    });
  }

  remove(id: number) {
    return this.prisma.composition.delete({
      where: {
        id: id,
      },
    });
  }
}

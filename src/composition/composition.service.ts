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
      include: {
        CompositionItems: {
          include: { Product: { include: { ProductPrice: true, Brand: true } } },
        },
      },
    });
  }

  addItem(compositionId: number, createCompositionItemDto: CreateCompositionItemDto) {
    return this.prisma.compositionItems.create({
      data: {composition_id: compositionId, ...createCompositionItemDto},
    });
  }

  updateItem(itemId: number, quantity: number) {
    return this.prisma.compositionItems.update({
      where: {
        id: itemId
      },
      data: { quantity },
    });
  }

  moveItem(newCompositionId: number, itemId: number) {
    return this.prisma.compositionItems.update({
      where: {
        id: itemId
      },
      data: { composition_id: newCompositionId },
    });
  }

  removeItem(itemId: number) {
    return this.prisma.compositionItems.delete({
      where: {
        id: itemId
      },
    });
  }

  findAll() {
    return this.prisma.composition.findMany();
  }

  async findOne(id: number) {
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

  async remove(id: number) {
    await this.prisma.compositionItems.deleteMany({
      where: {
        composition_id: id,
      }
    });

    return this.prisma.composition.delete({
      where: {
        id: id,
      },
    });
  }
}

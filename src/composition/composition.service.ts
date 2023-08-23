import { Injectable } from '@nestjs/common';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompositionService {
  constructor(private prisma: PrismaService) {}
  
  create(createCompositionDto: CreateCompositionDto) {
    return this.prisma.composition.create({
      data: createCompositionDto,
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

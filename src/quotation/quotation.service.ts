import { Injectable } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuotationService {
  constructor(private prisma: PrismaService) {}
  
  create(createQuotationDto: CreateQuotationDto) {
    return this.prisma.quotation.create({
      data: createQuotationDto,
    });
  }

  findAll() {
    return this.prisma.quotation.findMany();
  }

  findOne(id: number) {
    return this.prisma.quotation.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateQuotationDto: UpdateQuotationDto) {
    return this.prisma.quotation.update({
      where: {
        id: id,
      },
      data: updateQuotationDto,
    });
  }

  remove(id: number) {
    return this.prisma.quotation.delete({
      where: {
        id: id,
      },
    });
  }
}

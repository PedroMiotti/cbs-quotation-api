import { Injectable } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { PrismaService } from 'src/prisma.service';
import * as ExcelJS from 'exceljs';
import { formatToBrlCurrency } from 'src/utils/FormatCurrency';

@Injectable()
export class QuotationService {
  constructor(private prisma: PrismaService) {}

  create(createQuotationDto: CreateQuotationDto) {
    return this.prisma.quotation.create({
      data: createQuotationDto,
    });
  }

  findAll() {
    return this.prisma.quotation.findMany({ include: { Composition: true } });
  }

  async findOne(id: number) {
    return this.prisma.quotation.findUnique({
      where: {
        id: id,
      },
      include: {
        Composition: {
          include: {
            CompositionItems: {
              include: {
                Product: { include: { ProductPrice: true, Brand: true } },
              },
            },
          },
        },
      },
    });
  }

  async exportToExcel(id: number): Promise<ExcelJS.Buffer> {
    const data = await this.findOne(id); 
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${data.name}`);

    const borderStyle: Partial<ExcelJS.Borders> = {
      top: { style: 'thin', color: { argb: '#ff000000' } },
      left: { style: 'thin', color: { argb: '#ff000000' } },
      bottom: { style: 'thin', color: { argb: '#ff000000' } },
      right: { style: 'thin', color: { argb: '#ff000000' } },
    };

    const boldStyle = {
      bold: true,
    };

    let total = 0;
    for (const composition of data.Composition) {
      const compositionRow = worksheet.addRow([
        `Composição #${composition.id}`,
        composition.name,
      ]);
      compositionRow.eachCell((cell) => {
        cell.font = boldStyle;
      });

      worksheet.addRow([]);

      const headerRow = worksheet.addRow([
        'Produto',
        'Peso',
        'Quantidade',
        'Preço',
      ]);
      headerRow.eachCell((cell) => {
        cell.font = boldStyle;
        cell.border = borderStyle;
      });

      for (const item of composition.CompositionItems) {
        const currentPrice =
          item.Product.ProductPrice.find((price) => price.is_current).price ??
          0;
        total += (currentPrice as number) * item.quantity;
        const row = worksheet.addRow([
          item.Product.name,
          item.Product.weight,
          item.quantity,
          formatToBrlCurrency(currentPrice as number), 
        ]);
        row.eachCell((cell) => {
          cell.border = borderStyle;
        });
      }

      const totalRow = worksheet.addRow([
        'Total: ',
        formatToBrlCurrency(total),
      ]);
      totalRow.getCell(1).font = boldStyle;

      worksheet.addRow([]);
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
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

import { Controller, Get, Post, Body, Patch, Param, Delete, Res  } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Quotation')
@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Get(':id/export')
  async exportToExcel(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const buffer = await this.quotationService.exportToExcel(+id);

    res.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  }

  @Post()
  @ApiOperation({ summary: 'Create quotation' })
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all quotations' })
  findAll() {
    return this.quotationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find quotation by id' })
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update quotation by id' })
  update(@Param('id') id: string, @Body() updateQuotationDto: UpdateQuotationDto) {
    return this.quotationService.update(+id, updateQuotationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quotation by id' })
  remove(@Param('id') id: string) {
    return this.quotationService.remove(+id);
  }
}

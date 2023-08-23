import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Composition')
@Controller('composition')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @Post()
  @ApiOperation({ summary: 'Create composition' })
  create(@Body() createCompositionDto: CreateCompositionDto) {
    return this.compositionService.create(createCompositionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all compositions' })
  findAll() {
    return this.compositionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find composition by id' })
  findOne(@Param('id') id: string) {
    return this.compositionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update composition by id' })
  update(@Param('id') id: string, @Body() updateCompositionDto: UpdateCompositionDto) {
    return this.compositionService.update(+id, updateCompositionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete composition by id' })
  remove(@Param('id') id: string) {
    return this.compositionService.remove(+id);
  }
}

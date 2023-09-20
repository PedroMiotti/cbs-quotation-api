import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCompositionItemDto } from './dto/create-composition-item.dto';

@ApiTags('Composition')
@Controller('composition')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @Post()
  @ApiOperation({ summary: 'Create composition' })
  create(@Body() createCompositionDto: CreateCompositionDto) {
    return this.compositionService.create(createCompositionDto);
  }

  @Post(':id/item/add')
  @ApiOperation({ summary: 'Add item to composition' })
  addItem(
    @Param('id') id: string,
    @Body() createCompositionItemDto: CreateCompositionItemDto,
  ) {
    return this.compositionService.addItem(+id, createCompositionItemDto);
  }

  @Patch('item/:itemId/update')
  @ApiOperation({ summary: 'Update item quantity in composition' })
  updateItem(
    @Param('itemId') itemId: string,
    @Body() body: { quantity: number },
  ) {
    return this.compositionService.updateItem(+itemId, +body.quantity);
  }

  @Patch(':id/item/:itemId/move')
  @ApiOperation({ summary: 'Update item composition' })
  moveItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.compositionService.moveItem(+id, +itemId);
  }

  @Delete('item/:id/remove')
  @ApiOperation({ summary: 'Remove item from composition' })
  removeItem(@Param('id') id: string) {
    return this.compositionService.removeItem(+id);
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
  update(
    @Param('id') id: string,
    @Body() updateCompositionDto: UpdateCompositionDto,
  ) {
    return this.compositionService.update(+id, updateCompositionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete composition by id' })
  remove(@Param('id') id: string) {
    return this.compositionService.remove(+id);
  }
}

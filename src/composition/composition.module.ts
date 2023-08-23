import { Module } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CompositionController } from './composition.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CompositionController],
  providers: [CompositionService, PrismaService],
})
export class CompositionModule {}

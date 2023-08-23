import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentVariables } from './config/configuration';
import { QuotationModule } from './quotation/quotation.module';
import { CompositionModule } from './composition/composition.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentVariables],
      isGlobal: true,
    }),
    QuotationModule,
    CompositionModule,
  ],
})
export class AppModule {}

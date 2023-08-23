import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentVariables } from './config/configuration';
import { QuotationModule } from './quotation/quotation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentVariables],
      isGlobal: true,
    }),
    QuotationModule,
  ],
})
export class AppModule {}

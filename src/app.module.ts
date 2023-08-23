import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentVariables } from './config/configuration';
import { QuotationModule } from './quotation/quotation.module';
import { CompositionModule } from './composition/composition.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentVariables],
      isGlobal: true,
    }),
    QuotationModule,
    CompositionModule,
    ProductModule,
    BrandModule,
  ],
})
export class AppModule {}

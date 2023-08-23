import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentVariables } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentVariables],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

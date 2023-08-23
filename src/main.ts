import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.use(helmet());
  app.enableCors();

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Knower Authentication Api')
    .setDescription(
      'This service is responsible for authentication and authorization of Knower ecosystem.',
    )
    .setVersion('1.0')
    .addTag('knower')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get<string>('PORT');
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();

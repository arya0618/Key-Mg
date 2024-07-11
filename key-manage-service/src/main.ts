import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { constants } from './helpers/constants';
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const swaggerOpt = new DocumentBuilder()
    .setTitle(process.env.SERVICE_NAME)
    .setDescription(constants.swagger_msg)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOpt);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Task-app listening on port ${port}`);
}
bootstrap();

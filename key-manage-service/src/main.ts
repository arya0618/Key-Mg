import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { constants } from './helpers/constants';
// import { createClient } from 'redis';
async function bootstrap() {
  const logger = new Logger();
  const URL_REDIS_CONN = 'redis://localhost:6379';
  const NAME_CHANNEL = "channel1";

  const messagesStorage = [];

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
 // redisClient.connect().then(async() => {
  //  console.log("Redis connected")
  await  app.listen(port, () => console.log(` Key Manage Service Server listen on port ${port}  `));
  //});
  
 
}
bootstrap();

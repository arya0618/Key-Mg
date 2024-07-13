import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
// import * as redisStore from 'cache-manager-redis-store';
// import { createClient } from 'redis';
// import { RedisModule } from 'ioredis';

import { AppService } from './app.service';
import { HealthCheckModule } from '../health-check/health-check.module';
import { TokenModule } from '../token/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      
    }),
    TokenModule,
    RedisModule,
    HealthCheckModule,
  //  createClient({ url: "redis://localhost:6379" }),
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService,RedisService],
})
export class AppModule {
  constructor(private appService: AppService) {}
}

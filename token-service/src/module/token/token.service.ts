import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from '../redis/redis.service';
import { RequestLog } from './entity/request.entity';

@Injectable()
export class TokenService {
  private keysCache = new Map<string, any>();

  constructor(
    @InjectModel(RequestLog.name) private readonly requestLogModel: Model<RequestLog>,
    private readonly redisService: RedisService,
  ) {
    this.redisService.subscribe('key-created').subscribe(this.handleKeyEvent.bind(this));
    this.redisService.subscribe('key-updated').subscribe(this.handleKeyEvent.bind(this));
    this.redisService.subscribe('key-deleted').subscribe(this.handleKeyEvent.bind(this));
  }

  private handleKeyEvent(message: string) {
    console.log("event :",message)
    const key = JSON.parse(message);
    console.log("ket :",key)
    if (key.isActive) {
      
      console.log("in if ++==============================")
     
      this.keysCache.set(key.key, key);
    } else {
      console.log("INelse ++==============================")
      this.keysCache.delete(key.key);
    }
  }

  async getTokenInfo(tokenId: string, key: string): Promise<any> {
    const accessKey = this.keysCache.get(key);
    console.log("accessKey .....",accessKey)
    console.log("!accessKey .....",accessKey ,"    > ",accessKey.isActive)
    console.log("accessKey date.....",new Date() > new Date(accessKey.expiration))
    if (!accessKey.isActive || !(new Date() > new Date(accessKey.expiration))) {
      console.log("in if    " ,accessKey.isActive ,"<<<<<<<< ", new Date() > new Date(accessKey.expiration))
      throw new UnauthorizedException('Invalid or expired key');
    }

    const requests = await this.requestLogModel.countDocuments({
      key,
      timestamp: { $gte: new Date(Date.now() - 60000) },
    });

    if (requests >= accessKey.rateLimit) {
      throw new BadRequestException('Rate limit exceeded');
    }

    await new this.requestLogModel({ key, timestamp: new Date(), successful: true }).save();

    
    return { tokenId: tokenId, name: 'Mock Token', price: 123.45 };
  }
}

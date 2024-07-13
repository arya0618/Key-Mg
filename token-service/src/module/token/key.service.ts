import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Key } from './entity/key.entity';
import { AddKeyDto } from './dto/createKey.dto';
import { RedisService } from '../redis/redis.service';
import { UpdateKeyDto } from './dto/updateKey.dto';
import { channels } from 'src/helpers/constants';
// import { RedisService } from './redis.service';

// Service File for Manage Task Listing
@Injectable()
export class KeyService {
  constructor(
    @InjectModel('Key')
    private keyModel: mongoose.Model<Key>,
     private redisService:RedisService
    
  ) {}
  /**
   * get Task list  information
   */
  async getKeyByUser(userId: string): Promise<object> {
    try {
      const res = await this.keyModel.find({ assignedTo: userId });
      return res;
    } catch (error) {
      return error;
    }
  }
/**
 * createkey
 */
async createKey(createKeyDto: AddKeyDto): Promise<Key> {
  let key:string =  `${new Date() }_${createKeyDto.expiration}_`;
  console.log("key <<<<<",key)
  key = Buffer.from(key).toString("base64");
  console.log("key <<<<< encodoe",key)
  const createdKey = new this.keyModel(createKeyDto);
  createdKey.key=key
 
  await createdKey.save();
  this.redisService.publish(channels.CREATE, JSON.stringify(createdKey));
  return createdKey;
}

async deleteKey(key: string): Promise<void> {
  await this.keyModel.deleteOne({ key });
  console.log("deleteKey <<<<< key",key)
  this.redisService.publish(channels.DELETE, key);
}

async updateKey(updateKeyDto: UpdateKeyDto): Promise<Key> {
  let key :string = updateKeyDto.key
  console.log("updateKey <<<<< key",key)
  await this.keyModel.updateOne({ key }, updateKeyDto);
  
  const updatedKey = await this.keyModel.findOne({ key }).exec();
  this.redisService.publish(channels.DELETE, JSON.stringify(updatedKey));
  return updatedKey;
}
 
}

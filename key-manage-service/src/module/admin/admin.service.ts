import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './entity/user.entity';


// Service File for Manage Task Listing
@Injectable()
export class AdminService {
  constructor(
    @InjectModel('User')
    private userModel: mongoose.Model<User>,
  ) {}
  /**
   * get Task list  information
   */
  async getTaskByUser(userId: string): Promise<object> {
    try {
      const res = await this.userModel.find({ assignedTo: userId });
      return res;
    } catch (error) {
      return error;
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  
/**
 * create key
 */






  }

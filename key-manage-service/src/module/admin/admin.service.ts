import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';


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
  
  async login(login: LoginDto): Promise<any> {
    const admin = this.userModel.findOne({ userName:login.username })
if(!admin){
  return "no Admin found"
}
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.3k0Uixf6XS_QDq7VUEEmaZph_HZLqGdBhBpUjT4m7mg"
    
  }

  }

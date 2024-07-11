import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdminService } from './admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StartupService implements OnModuleInit {
  constructor(private readonly adminService: AdminService) {}

  async onModuleInit() {
    const admin = await this.adminService.findOne('admin');
    const user = await this.adminService.findOne('user');

    if (!admin) {
      await this.adminService.create({
        userName: 'admin',
        password: await bcrypt.hash('1234', 10),
        role: 'admin',
      });
      console.log('Admin user created');
    }

    if (!user) {
      await this.adminService.create({
        userName: 'user',
        password: await bcrypt.hash('1234', 10),
        role: 'user',
      });
      console.log('Sample user created');
    }
  }
}

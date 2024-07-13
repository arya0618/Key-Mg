import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema } from './entity/key.entity';
import { RolesGuard } from 'src/helpers/roles/roles.guards';

import { KeyService } from './key.service';
import { UserSchema } from './entity/user.entity';
import { StartupService } from './admin.startup.service';

@Module({
  controllers: [AdminController],
  imports: [
    
    AdminModule,
    MongooseModule.forFeature([{ name: 'Key', schema: KeySchema },{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AdminService, RolesGuard,KeyService,StartupService],
})
export class AdminModule {}

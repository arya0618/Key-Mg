import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema } from './entity/key.entity';
import { RolesGuard } from 'src/helpers/roles/roles.guards';
import { PassportModule } from '@nestjs/passport';
import { KeyService } from './key.service';
import { UserSchema } from './entity/user.entity';

@Module({
  controllers: [AdminController],
  imports: [
    PassportModule,
    AdminModule,
    MongooseModule.forFeature([{ name: 'Key', schema: KeySchema },{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AdminService, RolesGuard,KeyService],
})
export class AdminModule {}

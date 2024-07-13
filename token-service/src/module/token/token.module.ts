import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';

import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema } from './entity/key.entity';
import { RolesGuard } from 'src/helpers/roles/roles.guards';

import { KeyService } from './key.service';
import { RequestLogSchema } from './entity/request.entity';

@Module({
  controllers: [TokenController],
  imports: [
    // PassportModule,
    TokenModule,
    MongooseModule.forFeature([{ name: 'Key', schema: KeySchema },{ name: 'RequestLog', schema: RequestLogSchema }]),
  ],
  providers: [TokenService, RolesGuard,KeyService],
})
export class TokenModule {}

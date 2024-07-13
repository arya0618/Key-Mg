import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  ValidationPipe,
  UsePipes,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { constants, descriptionMsg } from 'src/helpers/constants';
import { AddKeyDto } from './dto/createKey.dto';
import { AdminService } from './admin.service';


import { Roles } from '../../helpers/roles/role.decorators';
import { RolesGuard } from 'src/helpers/roles/roles.guards';
import { KeyService } from './key.service';
import { UpdateKeyDto } from './dto/updateKey.dto';
import { UserRole } from 'src/helpers/enums';
import { UpdateActiveDto } from './dto/updateActive.dto';
import { LoginDto } from './dto/login.dto';
@ApiTags(`${constants.ADMIN_CONTROLLER}-API`)
@Controller(constants.ADMIN_CONTROLLER)
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly keyService: KeyService
    
  ) {}

  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: descriptionMsg.ADD_KEY,
  })
  @ApiBody({
    type: AddKeyDto,
    description: 'Json structure for key object',
  })
  @Post('/createkey')
  taskCreate(@Body() addKeyDto: AddKeyDto): Promise<object> {
    
    return this.keyService.createKey(addKeyDto)
  }

  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: descriptionMsg.ADD_KEY,
  })
  @ApiBody({
    type: AddKeyDto,
    description: 'Json structure for key object',
  })
  @Post('/login')
  loginAdmin(@Body() loginDto: LoginDto): Promise<object> {
    return this.adminService.login(loginDto)
  }

 
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: descriptionMsg.ADD_KEY,
  })
  @ApiBody({
    type: UpdateKeyDto,
    description: 'update key key records as admin',
  })
  @Post('/updatekey')
  updateCreate(@Body() updateKeyDto: UpdateKeyDto): Promise<object> {
    return this.keyService.updateKey(updateKeyDto)
  }

  @Roles(UserRole.USER)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: descriptionMsg.ADD_KEY,
  })
  @ApiBody({
    type: UpdateActiveDto,
    description: 'update key key records as admin',
  })
  @Post('/updateLimit')
  updateLimitByUser(@Body() updateActiveDto: UpdateActiveDto): Promise<object> {
    return this.keyService.updateLimitByUser(updateActiveDto)
  }

  }

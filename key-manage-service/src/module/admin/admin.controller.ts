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
@ApiTags(`${constants.ADMIN_CONTROLLER}-API`)
@Controller(constants.ADMIN_CONTROLLER)
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly keyService: KeyService
    
  ) {}

  
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



  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: descriptionMsg.ADD_KEY,
  })
  @ApiBody({
    type: AddKeyDto,
    description: 'Json structure for key object',
  })
  @Post('/updatekey')
  updateCreate(@Body() addKeyDto: AddKeyDto): Promise<object> {
    return this.keyService.createKey(addKeyDto)
  }


  }

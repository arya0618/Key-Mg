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
  UseGuards,Headers,
  HttpException
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { constants, descriptionMsg } from 'src/helpers/constants';
import { TokenService } from './token.service';
import { Roles } from '../../helpers/roles/role.decorators';
import { RolesGuard } from 'src/helpers/roles/roles.guards';

@ApiTags(`${constants.token_CONTROLLER}-API`)
@Controller(constants.token_CONTROLLER)
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('info')
  async getTokenInfo(@Query('tokenId') tokenId: string, @Headers('x-api-key') key: string) {
    if (!tokenId || !key) {
      throw new HttpException('Token ID and API Key are required', HttpStatus.BAD_REQUEST);
    }

    try {
      const tokenInfo = await this.tokenService.getTokenInfo(tokenId, key);
      return tokenInfo;
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  }

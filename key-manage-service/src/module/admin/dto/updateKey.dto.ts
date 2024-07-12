import { IsString, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class UpdateKeyDto {
  

  @ApiProperty({
    example: 'this key to access bitcoin',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'this key to access bitcoin',
  })
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({
    example: '10',
    required: true,
  })
  @IsNotEmpty()
 @IsString()
  rateLimit: String;
  
  @ApiProperty({
    example: '10',
    required: true,
  })
  @IsNotEmpty()
 @IsString()
 expiration: String;
  

  @ApiProperty({
    example: false,
    required: true,
  })
  @IsBoolean()
  isActive: boolean;

 }

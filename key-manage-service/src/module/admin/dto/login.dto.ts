import { IsBoolean } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  
  @ApiProperty({
    example: "admin",
    required: true,
  })
  @IsBoolean()
  username: string;

  
  @ApiProperty({
    example: "1234",
    required: true,
  })
  @IsBoolean()
  password: string;
 }

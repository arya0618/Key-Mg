import { IsBoolean } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class UpdateActiveDto {
  
  @ApiProperty({
    example: false,
    required: true,
  })
  @IsBoolean()
  isActive: boolean;

  
  @ApiProperty({
    example: false,
    required: true,
  })
  @IsBoolean()
  key: string;
 }

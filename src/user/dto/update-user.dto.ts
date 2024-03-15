import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    oldPassword: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    newPassword: string;
}

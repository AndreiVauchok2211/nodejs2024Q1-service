import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  grammary: boolean;
}

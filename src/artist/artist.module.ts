import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DataServices } from 'db/db';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DataServices],
})
export class ArtistModule {}

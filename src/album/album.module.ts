import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DataServices } from 'db/db';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DataServices],
})
export class AlbumModule {}

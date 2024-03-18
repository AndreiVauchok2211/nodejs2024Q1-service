import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataServices } from 'db/db';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DataServices],
})
export class TrackModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataServices } from 'db/db';
import { Track } from './entities/track.entity';
import { createID } from 'src/services/createID';

@Injectable()
export class TrackService {
  constructor(private readonly DBServices: DataServices) {}

  private Tracks: Track[] = this.DBServices.tracks;

  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: createID(),
      ...createTrackDto,
    };
    this.Tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.Tracks;
  }

  findOne(id: string) {
    return this.Tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.Tracks.find((track) => track.id === id);
    if (track) {
      track.name = updateTrackDto.name;
      track.albumId = updateTrackDto.albumId;
      track.artistId = updateTrackDto.artistId;
      track.duration = updateTrackDto.duration;
    }
    return track;
  }

  remove(id: string) {
    const trackIndex = this.Tracks.findIndex((track) => track.id === id);
    if (trackIndex == -1) {
      throw new NotFoundException({
        message: `Track not found`,
      });
    }
    this.Tracks.splice(trackIndex, 1);
    const index = this.DBServices.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    if (index != -1) {
      this.DBServices.favorites.tracks.splice(index, 1);
    }
  }
}

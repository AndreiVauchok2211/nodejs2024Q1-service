import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataServices, artists } from 'db/db';
import { Artist } from './entities/artist.entity';
import { createID } from 'src/services/createID';

@Injectable()
export class ArtistService {
  constructor(private readonly DBServices: DataServices) {}
  private Artists: Artist[] = this.DBServices.artists;

  create(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: createID(),
      ...createArtistDto,
    };
    this.Artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.Artists;
  }

  findOne(id: string) {
    return this.Artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.Artists.find((artist) => artist.id === id);
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
    }
    return artist;
  }

  remove(id: string) {
    const artistIndex = this.Artists.findIndex((artist) => artist.id === id);
    if (artistIndex == -1) {
      throw new NotFoundException({
        message: `Artist not found`,
      });
    }
    this.Artists.splice(artistIndex, 1);

    this.DBServices.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    this.DBServices.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    const indexFavorite = this.DBServices.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (indexFavorite != -1) {
      this.DBServices.favorites.artists.splice(indexFavorite, 1);
    }
  }
}

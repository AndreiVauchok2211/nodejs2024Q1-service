import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DataServices } from 'db/db';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly DBServices: DataServices,
  ) {}

  private Favorites: Favorite = this.DBServices.favorites;

  findAll() {
    return this.Favorites;
  }

  addTrackToFavorites(id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException({
        message: 'Track does not exist',
      });
    }
    this.Favorites.tracks.push(track);
    return track;
  }

  removeTrackToFavorites(id: string) {
    const trackIndex = this.Favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex == -1) {
      throw new NotFoundException({
        message: `Track is not favorite`,
      });
    }
    this.Favorites.tracks.splice(trackIndex, 1);
  }
  addArtistToFavorites(id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException({
        message: `Artist with id ${id} doesn't exist`,
      });
    }
    this.Favorites.artists.push(artist);
    return artist;
  }

  removeArtistFromFavorites(id: string) {
    const indexArtist = this.Favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (indexArtist == -1) {
      throw new NotFoundException({
        message: `Artist with id ${id} is not favorite`,
      });
    }

    this.Favorites.artists.splice(indexArtist, 1);
  }

  addAlbumToFavorites(id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException({
        message: `Album with id ${id} doesn't exist`,
      });
    }
    this.Favorites.albums.push(album);
    return album;
  }

  removeAlbumFromFavorites(id: string) {
    const indexAlbum = this.Favorites.albums.findIndex(
      (album) => album.id === id,
    );
    if (indexAlbum == -1) {
      throw new NotFoundException({
        message: `Album with id ${id} is not favorite`,
      });
    }
    this.Favorites.albums.splice(indexAlbum, 1);
  }
}

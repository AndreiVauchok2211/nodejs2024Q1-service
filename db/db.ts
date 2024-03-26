import { Injectable } from '@nestjs/common';
import {
  IAlbum,
  IArtist,
  IFavorites,
  ITrack,
  IUser,
} from 'interfaces/intefaces';

export const users: IUser[] = [];

export const artists: IArtist[] = [];

export const albums: IAlbum[] = [];

export const tracks: ITrack[] = [];

export const favorites: IFavorites = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class DataServices {
  get users() {
    return users;
  }
  get artists() {
    return artists;
  }
  get albums() {
    return albums;
  }
  get tracks() {
    return tracks;
  }
  get favorites() {
    return favorites;
  }
}

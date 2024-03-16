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

import { MODAL_TYPES } from 'constants/index';

export interface Album {
  id: number;
  created_at: string;
  artist: string;
  title: string;
  year: string;
  cd: boolean;
  favorite: boolean;
  studio: boolean;
}

export interface Release {
  id: number;
  created_at: string;
  artist: string;
  title: string;
  date: string | null;
}

export interface Song {
  id: number;
  created_at: string;
  artist: string;
  title: string;
  link: string;
}

export type Table = 'albums' | 'releases' | 'songs';

export interface AlbumInput {
  artist: string;
  title: string;
  year: string;
  cd: boolean;
  favorite: boolean;
  studio: boolean;
}

export interface ReleaseInput {
  artist: string;
  title: string;
  date: string;
}

export interface SongInput {
  artist: string;
  title: string;
  link: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export type Callback = () => void;

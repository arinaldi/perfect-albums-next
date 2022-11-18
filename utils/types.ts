import { ReactNode } from 'react';

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

export type AlbumInput = Omit<Album, 'id' | 'created_at'>;
export type ReleaseInput = Omit<Release, 'id' | 'created_at'>;
export type SongInput = Omit<Song, 'id' | 'created_at'>;

export interface SignInInput {
  email: string;
  password: string;
}

export type Callback = () => void;

export interface Children {
  children: ReactNode;
}

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export interface SupaError {
  message: string;
  status: number;
}

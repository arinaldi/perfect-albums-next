import { Document } from 'mongoose';

interface AlbumBase {
  aotd: boolean;
  artist: string;
  cd: boolean;
  favorite: boolean;
  title: string;
  year: string;
}

export interface AlbumData extends AlbumBase, Document {
  _id: string;
  updatedAt: Date;
}

export interface Album extends AlbumBase {
  id: string;
  updatedAt: string;
}

export interface Favorite {
  artist: string;
  title: string;
  year: string;
}

interface ReleaseBase {
  artist: string;
  title: string;
}

export interface ReleaseData extends ReleaseBase, Document {
  _id: string;
  date: Date | null;
}

export interface Release extends ReleaseBase {
  id: string;
  date: string | null;
}

interface SongBase {
  artist: string;
  title: string;
  link: string;
}

export interface SongData extends SongBase, Document {
  _id: string;
}

export interface Song extends SongBase {
  id: string;
}

export interface User {
  hash: string;
  id: string;
  salt: string;
  username: string;
}

export enum Method {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

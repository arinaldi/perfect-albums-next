import { Document } from 'mongoose';

interface AlbumBase {
  aotd: boolean;
  artist: string;
  cd: boolean;
  favorite: boolean;
  title: string;
  year: string;
}

export interface Album extends AlbumBase {
  id: string;
  updatedAt: string;
}

export interface AlbumData extends AlbumBase, Document {
  _id: string;
  updatedAt: Date;
}

export interface Favorite {
  artist: string;
  title: string;
  year: string;
}

export interface Release {
  id: string;
  artist: string;
  title: string;
  date: string;
}

export interface Song {
  id: string;
  artist: string;
  title: string;
  link: string;
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

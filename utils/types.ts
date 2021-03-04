export interface Album {
  aotd: boolean;
  artist: string;
  cd: boolean;
  favorite: boolean;
  id: string;
  title: string;
  updatedAt: string;
  year: string;
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

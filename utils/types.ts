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

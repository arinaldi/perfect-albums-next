export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      albums: {
        Row: {
          id: number;
          created_at: string;
          artist: string;
          title: string;
          year: string;
          cd: boolean;
          favorite: boolean;
          studio: boolean;
        };
        Insert: {
          id?: number;
          created_at?: string;
          artist?: string;
          title?: string;
          year?: string;
          cd?: boolean;
          favorite?: boolean;
          studio?: boolean;
        };
        Update: {
          id?: number;
          created_at?: string;
          artist?: string;
          title?: string;
          year?: string;
          cd?: boolean;
          favorite?: boolean;
          studio?: boolean;
        };
      };
      releases: {
        Row: {
          id: number;
          date: string | null;
          created_at: string;
          artist: string;
          title: string;
        };
        Insert: {
          id?: number;
          date?: string | null;
          created_at?: string;
          artist?: string;
          title?: string;
        };
        Update: {
          id?: number;
          date?: string | null;
          created_at?: string;
          artist?: string;
          title?: string;
        };
      };
      songs: {
        Row: {
          id: number;
          link: string;
          artist: string;
          created_at: string;
          title: string;
        };
        Insert: {
          id?: number;
          link?: string;
          artist?: string;
          created_at?: string;
          title?: string;
        };
        Update: {
          id?: number;
          link?: string;
          artist?: string;
          created_at?: string;
          title?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_artists: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

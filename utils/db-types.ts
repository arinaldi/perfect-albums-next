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
          created_at: string | null;
          artist: string | null;
          title: string | null;
          year: string | null;
          cd: boolean | null;
          favorite: boolean | null;
          studio: boolean | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          artist?: string | null;
          title?: string | null;
          year?: string | null;
          cd?: boolean | null;
          favorite?: boolean | null;
          studio?: boolean | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          artist?: string | null;
          title?: string | null;
          year?: string | null;
          cd?: boolean | null;
          favorite?: boolean | null;
          studio?: boolean | null;
        };
      };
      releases: {
        Row: {
          id: number;
          created_at: string | null;
          artist: string | null;
          title: string | null;
          date: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          artist?: string | null;
          title?: string | null;
          date?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          artist?: string | null;
          title?: string | null;
          date?: string | null;
        };
      };
      songs: {
        Row: {
          id: number;
          created_at: string | null;
          artist: string | null;
          title: string | null;
          link: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          artist?: string | null;
          title?: string | null;
          link?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          artist?: string | null;
          title?: string | null;
          link?: string | null;
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

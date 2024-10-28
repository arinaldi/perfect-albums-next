export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      albums: {
        Row: {
          artist: string;
          cd: boolean;
          created_at: string;
          favorite: boolean;
          id: number;
          studio: boolean;
          title: string;
          year: string;
          artist_title: string | null;
        };
        Insert: {
          artist: string;
          cd?: boolean;
          created_at?: string;
          favorite?: boolean;
          id?: number;
          studio?: boolean;
          title: string;
          year: string;
        };
        Update: {
          artist?: string;
          cd?: boolean;
          created_at?: string;
          favorite?: boolean;
          id?: number;
          studio?: boolean;
          title?: string;
          year?: string;
        };
        Relationships: [];
      };
      rankings: {
        Row: {
          album_id: number;
          created_at: string;
          id: number;
          position: number;
          year: string;
        };
        Insert: {
          album_id: number;
          created_at?: string;
          id?: number;
          position: number;
          year: string;
        };
        Update: {
          album_id?: number;
          created_at?: string;
          id?: number;
          position?: number;
          year?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'rankings_album_id_fkey';
            columns: ['album_id'];
            isOneToOne: true;
            referencedRelation: 'albums';
            referencedColumns: ['id'];
          },
        ];
      };
      releases: {
        Row: {
          artist: string;
          created_at: string;
          date: string | null;
          id: number;
          title: string;
        };
        Insert: {
          artist: string;
          created_at?: string;
          date?: string | null;
          id?: number;
          title: string;
        };
        Update: {
          artist?: string;
          created_at?: string;
          date?: string | null;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      songs: {
        Row: {
          artist: string;
          created_at: string;
          id: number;
          link: string;
          title: string;
        };
        Insert: {
          artist: string;
          created_at?: string;
          id?: number;
          link: string;
          title: string;
        };
        Update: {
          artist?: string;
          created_at?: string;
          id?: number;
          link?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      albums_by_year: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      artist_title: {
        Args: {
          '': unknown;
        };
        Returns: string;
      };
      get_artists: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      leaderboard: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      search_albums: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

import { ReactNode } from 'react';

import type { Database } from 'utils/db-types';

export type Album = Database['public']['Tables']['albums']['Row'];
export type Release = Database['public']['Tables']['releases']['Row'];
export type Song = Database['public']['Tables']['songs']['Row'];

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

import { NextResponse } from 'next/server';

import { createClient, type SupabaseClient } from 'utils/supabase/server';

interface Artist {
  artist: string;
}

async function getArtists(supabase: SupabaseClient): Promise<string[]> {
  // https://www.jeffreyknox.dev/blog/postgresql-functions-in-supabase/
  const { data, error } = await supabase.rpc('get_artists');
  const artists = data as unknown as Artist[];

  if (error) throw error;
  if (artists) return artists.map((a) => a.artist);
  return [];
}

export async function GET() {
  const supabase = await createClient();

  try {
    const artists = await getArtists(supabase);
    return NextResponse.json({ success: true, artists });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

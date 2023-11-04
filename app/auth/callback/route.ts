import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createClient } from 'utils/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (code) {
    const supabase = createClient(cookies());
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(url.origin);
}

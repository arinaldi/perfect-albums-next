import { NextRequest, NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

import { ROUTE_HREF } from 'constants/index';
// import supabase from 'utils/supabase';

export async function middleware(req: NextRequest) {
  const token = req.cookies['sb:token'];

  if (!token) return NextResponse.redirect(ROUTE_HREF.TOP_ALBUMS, 302);

  // TODO: replace jwt.verify with this? if yes, uncomment in utils/supabase too
  // const { user, error } = await supabase.auth.api.getUserByCookie(req);
  // console.log({ user, error });

  const isValid = await jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);

  if (!isValid) return NextResponse.redirect(ROUTE_HREF.TOP_ALBUMS, 302);

  return NextResponse.next();
}

/*
  https://github.com/jitsucom/supabase-nextjs-middleware/blob/main/pages/app/_middleware.ts

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL as string}/auth/v1/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      },
    },
  );
  const data = await response.json();
*/

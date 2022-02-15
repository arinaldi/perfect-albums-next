import { NextRequest, NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

import { ROUTE_HREF } from 'constants/index';

export async function middleware(req: NextRequest) {
  const token = req.cookies['sb-access-token'];
  const url = req.nextUrl.clone();
  url.pathname = ROUTE_HREF.TOP_ALBUMS;

  if (!token) {
    return NextResponse.redirect(url, 302);
  }

  const isValid = await jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);

  if (!isValid) {
    return NextResponse.redirect(url, 302);
  }

  return NextResponse.next();
}

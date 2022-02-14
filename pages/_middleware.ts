import { NextRequest, NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

import { ROUTE_HREF, ROUTES_ADMIN } from 'constants/index';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies['sb-access-token'];

  if (pathname === '/') {
    return NextResponse.redirect(ROUTE_HREF.TOP_ALBUMS, 302);
  }

  if (pathname !== ROUTE_HREF.SIGNIN || !token) {
    return NextResponse.next();
  }

  const isValid = await jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);

  if (isValid) {
    return NextResponse.redirect(ROUTES_ADMIN.base.href, 302);
  }

  return NextResponse.next();
}

import { NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

import { ROUTES_ADMIN, ROUTE_HREF } from 'constants/index';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token');
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  if (pathname === '/') {
    url.pathname = ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url, 302);
  }

  if (pathname === ROUTE_HREF.SIGNIN) {
    if (token) {
      url.pathname = ROUTES_ADMIN.base.href;
      return NextResponse.redirect(url, 302);
    }
  }

  if (pathname.startsWith(ROUTES_ADMIN.base.href)) {
    url.pathname = ROUTE_HREF.TOP_ALBUMS;

    if (!token) {
      return NextResponse.redirect(url, 302);
    }

    const isValid = await jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET as string,
    );

    if (!isValid) {
      return NextResponse.redirect(url, 302);
    }
  }

  return NextResponse.next();
}

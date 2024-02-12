import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from 'utils/supabase/middleware';

import { ROUTE_HREF, ROUTES_ADMIN } from 'utils/constants';

export async function middleware(req: NextRequest) {
  const { res, user } = await createClient(req);

  if (req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = user ? ROUTES_ADMIN.base.href : ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname === ROUTE_HREF.SIGNIN && user) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTES_ADMIN.base.href;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith(ROUTES_ADMIN.base.href) && !user) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from 'utils/supabase/middleware';

import { ROUTE_HREF, ROUTES_ADMIN } from 'utils/constants';

export async function middleware(req: NextRequest) {
  const { res, session } = await createClient(req);

  if (req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = session ? ROUTES_ADMIN.base.href : ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname === ROUTE_HREF.SIGNIN && session) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTES_ADMIN.base.href;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith(ROUTES_ADMIN.base.href) && !session) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

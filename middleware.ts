import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import { ROUTE_HREF, ROUTES_ADMIN } from 'utils/constants';
import type { Database } from 'utils/db-types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

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

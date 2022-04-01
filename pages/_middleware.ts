import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_OPTIONS } from '@supabase/supabase-auth-helpers/shared/utils/constants';

import { ROUTES_ADMIN, ROUTE_HREF } from 'constants/index';

export async function middleware(req: NextRequest) {
  const token = req.cookies[`${COOKIE_OPTIONS.name}-access-token`];
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  if (pathname === '/') {
    url.pathname = ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url, 302);
  }

  if (pathname === ROUTE_HREF.SIGNIN && token) {
    url.pathname = ROUTES_ADMIN.base.href;
    return NextResponse.redirect(url, 302);
  }

  return NextResponse.next();
}

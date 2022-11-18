import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { ROUTE_HREF, ROUTES_ADMIN } from 'utils/constants';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url);
  }

  if (session && req.nextUrl.pathname === ROUTE_HREF.SIGNIN) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTES_ADMIN.base.href;
    return NextResponse.redirect(url);
  }

  if (!session && req.nextUrl.pathname.startsWith(ROUTES_ADMIN.base.href)) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url);
  }

  return res;
}

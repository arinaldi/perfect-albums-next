import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

import { ROUTE_HREF, ROUTES_ADMIN } from 'utils/constants';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = user ? ROUTES_ADMIN.base.href : ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname === ROUTE_HREF.SIGNIN && user) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES_ADMIN.base.href;
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith(ROUTES_ADMIN.base.href) && !user) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return response;
}

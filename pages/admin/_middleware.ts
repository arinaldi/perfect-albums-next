import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_OPTIONS } from '@supabase/supabase-auth-helpers/shared/utils/constants';
// import { withMiddlewareAuth } from '@supabase/supabase-auth-helpers/nextjs/middleware';

import { ROUTE_HREF } from 'constants/index';

// https://github.com/supabase-community/supabase-auth-helpers/issues/90
// export const middleware = withMiddlewareAuth({
//   redirectTo: ROUTE_HREF.TOP_ALBUMS,
// });

export async function middleware(req: NextRequest) {
  const token = req.cookies[`${COOKIE_OPTIONS.name}-access-token`];
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url, 302);
  }

  return NextResponse.next();
}

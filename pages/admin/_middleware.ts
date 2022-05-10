// import { withMiddlewareAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';

// import { ROUTE_HREF } from 'constants/index';

// export const middleware = withMiddlewareAuthRequired({
//   redirectTo: ROUTE_HREF.TOP_ALBUMS,
// });

import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_OPTIONS } from '@supabase/supabase-auth-helpers/shared/utils/constants';

import { ROUTE_HREF } from 'constants/index';

// import { withMiddlewareAuth } from '@supabase/supabase-auth-helpers/nextjs/middleware';
// version 1.4.0
// https://github.com/supabase-community/supabase-auth-helpers/issues/90

export async function middleware(req: NextRequest) {
  const token = req.cookies[`${COOKIE_OPTIONS.name}-access-token`];
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = ROUTE_HREF.TOP_ALBUMS;
    return NextResponse.redirect(url, 302);
  }

  return NextResponse.next();
}

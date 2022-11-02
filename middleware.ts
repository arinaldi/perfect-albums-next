import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs';

import { ROUTE_HREF } from 'utils/constants';

export const middleware = withMiddlewareAuth({
  redirectTo: ROUTE_HREF.TOP_ALBUMS,
});

export const config = {
  matcher: ['/admin/:path*'],
};

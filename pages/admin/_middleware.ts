import { withMiddlewareAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';

import { ROUTE_HREF } from 'constants/index';

export const middleware = withMiddlewareAuthRequired({
  redirectTo: ROUTE_HREF.TOP_ALBUMS,
});

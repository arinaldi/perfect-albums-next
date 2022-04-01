import { handleAuth } from '@supabase/supabase-auth-helpers/nextjs';

import { ROUTE_HREF } from 'constants/index';

export default handleAuth({ logout: { returnTo: ROUTE_HREF.TOP_ALBUMS } });

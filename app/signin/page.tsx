import 'server-only';

import Signin from 'app/signin/SignIn';
import { createClient } from 'utils/supabase-server';

export const metadata = {
  title: 'Sign In | Perfect Albums',
};

export default async function SigninPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Signin user={user} />;
}

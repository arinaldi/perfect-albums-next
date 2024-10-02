import 'server-only';

import Signin from 'app/signin/SignIn';

export const metadata = {
  title: 'Sign in | Perfect Albums',
};

export default async function SignInPage() {
  return <Signin />;
}

import 'server-only';

import Signin from 'app/signin/SignIn';

export const metadata = {
  title: 'Sign in | Perfect albums',
};

export default async function SigninPage() {
  return <Signin />;
}

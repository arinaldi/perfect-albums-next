import 'server-only';
import { Metadata } from 'next';

import Signin from 'app/signin/SignIn';

export const metadata: Metadata = {
  title: 'Sign in | Perfect Albums',
};

export default async function SignInPage() {
  return <Signin />;
}

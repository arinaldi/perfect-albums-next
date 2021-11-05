import Head from 'next/head';

import { getTitle } from 'utils';
import SignIn from 'components/SignIn';

export default function SigninPage() {
  return (
    <>
      <Head>
        <title>{getTitle('Sign In')}</title>
      </Head>
      <SignIn />
    </>
  );
}

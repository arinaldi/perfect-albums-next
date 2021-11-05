import Head from 'next/head';

import { getTitle } from 'utils';
import SignIn from 'components/SignIn';

function SigninPage() {
  return (
    <>
      <Head>
        <title>{getTitle('Sign In')}</title>
      </Head>
      <SignIn />
    </>
  );
}

export default SigninPage;

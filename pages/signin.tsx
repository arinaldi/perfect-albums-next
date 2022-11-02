import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { getTitle } from 'utils';
import SignIn from 'components/SignIn';
import { ROUTES_ADMIN } from 'utils/constants';

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

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  if (req.headers.cookie?.startsWith('supabase-auth-token')) {
    return {
      redirect: {
        destination: ROUTES_ADMIN.base.href,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

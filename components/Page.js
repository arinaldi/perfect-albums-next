import Head from 'next/head';

import NavBar from './NavBar';

export default function Page ({ children }) {
  return (
    <div>
      <Head>
        <title>Perfect Albums</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      {children}
    </div>
  );
}
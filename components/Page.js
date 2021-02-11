import Head from 'next/head';

import NavBar from './NavBar';

export default function Page({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
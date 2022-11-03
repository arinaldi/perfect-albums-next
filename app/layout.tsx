import { Children } from 'utils/types';
import 'styles/globals.css';
import 'styles/nprogress.css';

export default function RootLayout({ children }: Children) {
  return (
    <html>
      {/* eslint-disable-next-line */}
      <head>
        <title>Perfect Albums</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="https://fav.farm/🎧" />
      </head>
      <body className="min-h-screen dark:bg-gray-800">
        {/* <NavBar /> */}
        <nav className="p-4 bg-gray-800 text-white">NavBar</nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

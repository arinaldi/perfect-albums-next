import { randomBytes } from 'crypto';
import { Html, Head, Main, NextScript } from 'next/document';

// https://github.com/vercel/next.js/issues/18557
function getCsp(nonce: string) {
  const isProd = process.env.NODE_ENV === 'production';
  let csp = ``;

  csp += `base-uri 'self';`;
  csp += `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL};`;
  csp += `default-src 'self';`;
  csp += `form-action 'self';`;
  csp += `frame-src 'self';`;
  csp += `img-src 'self' data:;`;
  csp += `prefetch-src 'self';`;
  csp += `script-src 'self' ${isProd ? '' : "'unsafe-eval'"};`;
  csp += `script-src-elem 'self' 'nonce-${nonce}';`;
  csp += `style-src 'self' 'unsafe-inline';`;

  return csp;
}

export default function Document() {
  const nonce = randomBytes(16).toString('base64');

  return (
    <Html>
      <Head nonce={nonce}>
        <meta httpEquiv="Content-Security-Policy" content={getCsp(nonce)} />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
        <script
          id="dark-mode"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
            const root = window.document.documentElement;
            const prefersDark = !('theme' in localStorage) &&
              window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (localStorage.theme === 'dark' || prefersDark) {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
          `,
          }}
        />
      </body>
    </Html>
  );
}

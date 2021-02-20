import router from 'next/router';
import nProgress from 'nprogress';

import { Provider } from '../components/Provider';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/nprogress.css';

router.events.on('routeChangeStart', () => nProgress.start());
router.events.on('routeChangeComplete', () => nProgress.done());
router.events.on('routeChangeError', () => nProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

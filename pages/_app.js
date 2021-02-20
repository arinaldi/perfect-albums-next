import { Provider } from '../components/Provider';
import Layout from '../components/Layout';
import Progress from '../components/Progress';
import '../styles/globals.css';
import '../styles/nprogress.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Progress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

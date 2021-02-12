import { Provider } from '../components/Provider';
import Page from '../components/Page';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Provider>
  );
}

export default MyApp

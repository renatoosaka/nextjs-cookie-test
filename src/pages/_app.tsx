import { CookiesProvider } from 'react-cookie'
import ApplicationProvider from '../hooks'

function MyApp({ Component, pageProps }) {
  return (    
    <CookiesProvider>
      <ApplicationProvider>
        <Component {...pageProps} />
      </ApplicationProvider>
    </CookiesProvider>
  );
}

export default MyApp

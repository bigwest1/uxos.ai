import '../styles/gloabal.css'
import ErrorBoundary from '../components/ErrorBoundary';

function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default App;
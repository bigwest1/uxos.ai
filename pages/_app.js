import '../styles/global.css'
import ErrorBoundary from '../components/ErrorBoundary';

function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
        <Component {...pageProps} />
      </div>
    </ErrorBoundary>
  );
}

export default App;

import '../styles/globals.css'; // Ensure this path is correct based on your project's structure
import 'tailwindcss/tailwind.css'; // If using Tailwind via PostCSS


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

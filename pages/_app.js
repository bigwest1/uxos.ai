// pages/_app.js
import '../styles/styles.css'  // adjust path as needed
import '../styles/globals.css'


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

import "../styles/globals.css";
import "../configureAmplify";
import Navbar from "./components/navbar";
import "./styles.css"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <div className='fix-color py-8 px-16'>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;

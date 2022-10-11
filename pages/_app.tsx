import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { getLibrary } from "../utils/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "../contexts/web3-context";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isOnAnErrorPage = router.pathname === "/404";

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Provider>
        {isOnAnErrorPage ? null : <Header />}
        <Component {...pageProps} />
        {isOnAnErrorPage ? null : <Footer />}
      </Web3Provider>
    </Web3ReactProvider>
  );
}

export default MyApp;

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isOnAnErrorPage = router.pathname === "/404";

  return (
    <>
      {isOnAnErrorPage ? null : <Header />}
      <Component {...pageProps} />
      {isOnAnErrorPage ? null : <Footer />}
    </>
  );
}

export default MyApp;

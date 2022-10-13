import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { chains, providers } from "@web3modal/ethereum";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isOnAnErrorPage = router.pathname === "/404";

  if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_ID)
    throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");

  const modalConfig: ConfigOptions = {
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
    theme: "dark",
    accentColor: "default",
    ethereum: {
      appName: "web3Modal",
      autoConnect: true,
      chains: [chains.binanceSmartChain, chains.binanceSmartChainTestnet],
      providers: [
        providers.walletConnectProvider({
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
        }),
      ],
    },
  };

  return (
    // <Web3ReactProvider getLibrary={getLibrary}>
    //   <Web3Provider>
    <>
      {isOnAnErrorPage ? null : <Header />}
      {/* </Web3Provider>
      </Web3ReactProvider> */}
      <Component {...pageProps} />
      <Web3Modal config={modalConfig} />
      {isOnAnErrorPage ? null : <Footer />}
    </>
  );
}

export default MyApp;

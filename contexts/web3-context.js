import * as React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3Modal from "web3modal";

const Web3Context = React.createContext();

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      network: "binance",
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
      },
    },
  },
};

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
  loading: true,
  signer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
        signer: action.signer,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}

function Web3Provider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context

  const { provider } = state;

  const connect = React.useCallback(async function () {
    try {
      dispatch({ type: "SET_LOADING", loading: true });
      // This is the initial `provider` that is returned when
      // using web3Modal to connect. Can be MetaMask or WalletConnect.
      const provider = await web3Modal.connect();

      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();

      const address = await signer.getAddress();

      const network = await web3Provider.getNetwork();

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
        signer,
      });
      dispatch({ type: "SET_LOADING", loading: false });
    } catch (error) {
      dispatch({ type: "SET_LOADING", loading: false });
      console.log(error);
    }
  }, []);

  const disconnect = React.useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  // Auto connect to the cached provider
  React.useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    } else {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  React.useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleChainChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const value = { ...state, disconnect, connect, web3Modal };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

function useWeb3() {
  const context = React.useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}

export { Web3Provider, useWeb3 };

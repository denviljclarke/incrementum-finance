export const isDevelopment = () => process.env.NODE_ENV === 'development';

export const isStaging = () =>
  process.env.REACT_APP_VERCEL_GIT_COMMIT_REF === 'staging';

export const isProduction = () =>
  process.env.REACT_APP_VERCEL_GIT_COMMIT_REF === 'master';

export const getNodeURI = () =>
  isDevelopment()
    ? process.env.REACT_APP_TESTNET_URI
    : process.env.REACT_APP_MAINNET_URI;

export const getDefaultNetworkName = () => 'binance';

export const getDefaultChainID = () => 56;

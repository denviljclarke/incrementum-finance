import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { Contract, ethers } from "ethers";
import {
  useConnectModal,
  useContract,
  useAccount,
  useSwitchNetwork,
  useNetwork,
  useContractRead,
} from "@web3modal/react";
import { JsonRpcProvider } from "@ethersproject/providers";

import colors from "../designSystem/colors";
import { Title, BaseText } from "../designSystem";
import sizes from "../designSystem/sizes";

import useInterval from "../hooks/useInterval";
import usePullUp from "../hooks/usePullUp";

import Spacer from "../components/Spacer";
import theme from "../designSystem/theme";
import pIncrementumABI from "../web3/pIncrementumAbi.json";

const MainContainer = styled(Container)`
  padding-top: 40px;
  padding-bottom: 200px;
  height: calc(100% - 52px - ${theme.header.height}px);
  @media (max-width: ${sizes.md}px) {
    padding-top: 40px;
    padding-bottom: 80px;
    height: revert;
  }
`;

const MissionTitleRow = styled(Row)`
  margin-top: 40px;
  justify-content: center;
`;

const MissionSubtitleRow = styled(Row)`
  margin-top: 20px;
  justify-content: center;
`;

const MissionTitle = styled(Title)`
  font-size: 48px;
  line-height: 56px;
  width: 100%;
  text-transform: uppercase;
  text-align: center;

  @media (max-width: ${sizes.md}px) {
    font-size: 40px;
    line-height: 40px;
  }
`;
const PrivateSaleQuestionTitle = styled(Title)`
  margin-top: 12px;
  font-size: 16px;
  line-height: 16px;
  width: 100%;
  text-transform: uppercase;
  text-align: center;

  @media (max-width: ${sizes.md}px) {
    font-size: 16px;
    line-height: 16px;
  }
`;

const MissionSubtitle = styled(BaseText)`
  font-size: 16px;
  line-height: 24px;
  color: ${colors.text};
  text-align: center;
`;

const TitleAlt = styled(MissionTitle)`
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px ${colors.incrementum};
`;

const BNBProgress = styled(Title)`
  font-size: ${32 / 16}rem;
  line-height: 40px;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px ${colors.incrementum};

  @media (max-width: ${sizes.md}px) {
    font-size: ${32 / 16}rem;
    line-height: 40px;
  }
`;

export const Button = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  text-align: center;
  pointer-events: auto;
  border: 2px solid ${colors.primaryText};
  box-sizing: border-box;
  border-radius: 8px;
  background: transparent;
  color: ${colors.primaryText};
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 30px;
  padding-right: 30px;
  text-transform: uppercase;
  font-family: VCR;
`;

const SaleCard = styled.div`
  border: 2px solid ${colors.primaryText};
  border-radius: 8px;
  width: 50%;
  margin: 40px auto 0 auto;
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* gap: 32px; */

  @media (max-width: ${sizes.md}px) {
    width: 100%;
  }
`;

const ConnectButton = () => {
  const { address, isConnected, isConnecting, isDisconnected, status } =
    useAccount();
  const { chain } = useNetwork();
  const { isOpen, open, close } = useConnectModal();
  const { switchNetwork } = useSwitchNetwork();

  if (!status) {
    return null;
  }

  if (isConnected) {
    return null;
  }

  if (isConnected && chain?.unsupported) {
    return (
      <Button onClick={() => switchNetwork({ chainId: 56 })}>
        Wrong Network - Switch to Binance Smart Chain
      </Button>
    );
  }

  return <Button onClick={open}>Connect to a Wallet</Button>;
};

const ProgressBarWrapper = styled.div<{ hide?: boolean }>`
  color: ${colors.incrementum};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 54px;
  width: 100%;
  display: ${(props) => {
    if (props.hide) {
      return "none";
    }
  }};

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 32px;
    width: 100%;
  }

  progress[value]::-webkit-progress-bar {
    border-radius: 8px;
    width: 100%;
    height: 32px;
    background: ${colors.incrementum}29;
  }
  progress[value]::-webkit-progress-value {
    border-radius: 8px;
    background-color: ${colors.incrementum};
    height: 32px;
  }
`;

const MaxWidthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  align-items: center;
  justify-content: center;
  margin: 24px auto 0 auto;

  @media (max-width: ${sizes.md}px) {
    max-width: 66%;
  }
  @media (max-width: ${sizes.sm}px) {
    max-width: 100%;
  }
`;

const ProgressBar = ({
  value,
  max = 50,
  completed,
  loading,
}: {
  value: number;
  max?: number;
  completed?: boolean;
}) => {
  return (
    <ProgressBarWrapper hide={loading}>
      {completed ? (
        <BNBProgress>Sold Out</BNBProgress>
      ) : (
        <BNBProgress>
          {value} / {max} BNB
        </BNBProgress>
      )}
      <progress value={completed ? max : value} max={max} />
    </ProgressBarWrapper>
  );
};

const CountDown = ({ end }) => {
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [mins, setMins] = React.useState(0);
  const [secs, setSecs] = React.useState(0);

  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  useInterval(
    () => {
      const now = new Date().getTime();
      const timeUntilDay = end - now;

      const days = Math.floor(timeUntilDay / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeUntilDay % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((timeUntilDay % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((timeUntilDay % (1000 * 60)) / 1000);

      if (timeUntilDay < 0) {
        return;
      }
      setDays(days);
      setHours(hours);
      setMins(mins);
      setSecs(secs);
    },
    isFirstRender ? 0 : 1000
  );

  return <BNBProgress>{`${days} : ${hours} : ${mins} : ${secs} `}</BNBProgress>;
};

// const CONTRACT_ADDRESS = process.env.NODE_ENV === "development" ? PIncrementum_CONTRACT_ADDRESS
const PIncrementum_CONTRACT_ADDRESS =
  "0xFA45020d7d00f4DAEa5E9dc4d0DBAf14bddb7B1e";
const dDay = new Date().getTime() + 10000;
// process.env.NODE_ENV === 'development'
//   ? new Date().getTime() + 10000
//   : new Date(Date.UTC(2021, 10, 19, 19)).getTime();
const maxIncrementum = 50;
const PrivateSale = () => {
  usePullUp();

  const [goTime, setGoTime] = React.useState(false);
  const [hasClaimed, setHasClaimed] = React.useState(false);
  const [canClaim, setCanClaim] = React.useState(true);
  const [delay] = React.useState(1000);
  const [pause, setPause] = React.useState(false);
  const [pIncrementumBalance, setPIncrementumBalance] = React.useState(0);
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  const pubProvider = new JsonRpcProvider("https://bsc-dataseed.binance.org/");
  const {
    data: incrementumSold = 0,
    error,
    isLoading,
    refetch,
  } = useContractRead({
    addressOrName: PIncrementum_CONTRACT_ADDRESS,
    contractInterface: pIncrementumABI,
    functionName: "getTotalRaised",
    // watch: true,
  });

  const now = new Date().getTime();
  const [parsedIncrementumSold, setParsedIncrementumSold] = React.useState(0);

  React.useEffect(() => {
    setParsedIncrementumSold(
      parseInt(ethers.utils.formatEther(incrementumSold)) - 1 // Off by one error in original contract
    );
  }, [incrementumSold]);

  const completed =
    parsedIncrementumSold >= maxIncrementum && now > dDay && hasClaimed;

  const claimToken = async (BNBAmount: number) => {
    //Mocking everything
    setParsedIncrementumSold((old) => old + BNBAmount);
    setHasClaimed(true);
    // parsedIncrementumSold += BNBAmount;
    // console.log(parsedIncrementumSold);
    // const pIncrementumABI = [
    //   "function claim() external payable",
    //   "function getTotalRaised() external view returns (uint256)",
    // ];
    // if (pIncrementumContract) {
    //   // const pIncrementumContract = new Contract(
    //   //   PIncrementum_CONTRACT_ADDRESS,
    //   //   pIncrementumABI,
    //   //   signer
    //   // );
    //   try {
    //     const result = await pIncrementumContract.claim({
    //       value: ethers.utils.parseEther(BNBAmount),
    //     });
    //     setCanClaim(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  // const updateProgress = async () => {
  //   const pIncrementumABI = [
  //     "function claim() external payable",
  //     "function getTotalRaised() external view returns (uint256)",
  //     "function hasClaimed() external view returns (bool)",
  //   ];

  //   const pubProvider = new JsonRpcProvider(
  //     "https://bsc-dataseed.binance.org/"
  //   );

  //   if (pIncrementumContract) {
  //     // const pIncrementumContract = new Contract(
  //     //   PIncrementum_CONTRACT_ADDRESS,
  //     //   pIncrementumABI,
  //     //   pubProvider
  //     // );

  //     try {
  //       const totalRaised = ethers.BigNumber.from(
  //         await pIncrementumContract.getTotalRaised()
  //       );
  //       setIncrementumSold(parseInt(ethers.utils.formatEther(totalRaised)) + 1); // Contract off by one error
  //       if (IncrementumSold >= maxIncrementum) {
  //         setCompleted(true);
  //       }
  //     } catch (error) {
  //       setPause(true);
  //       console.log(error);
  //     }
  //   }
  // };

  // const updateCanClaim = async () => {
  //   const pIncrementumABI = [
  //     "function claim() external payable",
  //     "function getTotalRaised() external view returns (uint256)",
  //     "function hasClaimed() external view returns (bool)",
  //   ];

  //   if (PIncrementum_CONTRACT_ADDRESS && signer) {
  //     const pIncrementumContract = new Contract(
  //       PIncrementum_CONTRACT_ADDRESS,
  //       pIncrementumABI,
  //       signer
  //     );
  //     try {
  //       const hasClaimed = await pIncrementumContract.hasClaimed();
  //       setCanClaim(!hasClaimed);
  //     } catch (error) {
  //       setPause(true);
  //       console.log(error);
  //     }
  //   }
  // };

  // const updateBalance = async () => {
  //   const pIncrementumABI = [
  //     "function balanceOf(address account) external view returns (uint256)",
  //   ];

  //   if (PIncrementum_CONTRACT_ADDRESS && signer) {
  //     const pIncrementumContract = new Contract(
  //       PIncrementum_CONTRACT_ADDRESS,
  //       pIncrementumABI,
  //       signer
  //     );
  //     try {
  //       const balance = await pIncrementumContract.balanceOf(address);
  //       setPIncrementumBalance(parseInt(ethers.utils.formatEther(balance)));
  //     } catch (error) {
  //       setPause(true);
  //     }
  //   }
  // };

  // useInterval(
  //   () => {
  //     updateProgress();
  //   },
  //   completed ? null : delay
  // );

  // useInterval(
  //   () => {
  //     updateBalance();
  //     updateCanClaim();
  //   },
  //   canClaim ? delay : null
  // );

  useInterval(
    () => {
      const timeUntilDay = dDay - new Date().getTime();
      if (timeUntilDay < 0) {
        setGoTime(true);
      }
    },
    goTime ? null : delay
  );

  return (
    <MainContainer>
      <MissionTitleRow>
        <Col xs={11} lg={10} xl={6} className="d-flex">
          <MissionTitle>
            <TitleAlt>Incrementum</TitleAlt>
            <br />
            Private Sale
          </MissionTitle>
        </Col>
      </MissionTitleRow>

      <MissionSubtitleRow>
        <Col xs={12} md={8} xl={6} className="d-flex">
          <MissionSubtitle>
            Welcome to the Incrementum private sale, thank you for being an
            early supporter. By participating in this sale you&apos;ll become an
            early stage investor and will benefit by buying the $Incrementum
            token at the best price. Participating will also help fuel the
            projects marketing efforts up until our presale on Pinksale.
          </MissionSubtitle>
        </Col>
      </MissionSubtitleRow>

      <MaxWidthWrapper>
        <PrivateSaleQuestionTitle>How does this work?</PrivateSaleQuestionTitle>
        <br />
        <MissionSubtitle>
          To participate you will exchange BNB for $pIncrementum (private
          $Incrementum). The amount of $pIncrementum you receive will represent
          your share and will be redeemable for $Incrementum at a 1:10 ratio.
          Once the Incrementum token is available you will be able to exchange
          your $pIncrementum for $Incrementum on this page.
        </MissionSubtitle>
      </MaxWidthWrapper>
      <SaleCard>
        <div style={{ color: colors.primaryText, textAlign: "center" }}>
          Sale Type - First Come
          <br />
          Hard Cap 50BNB
          <br />
          1BNB = 6,000,000 $pIncrementum
        </div>
        <Spacer size={32} />
        {isLoading ? null : (
          <>
            {goTime || completed ? (
              <ProgressBar
                completed={completed}
                value={parsedIncrementumSold}
                loading={isLoading}
              />
            ) : (
              <CountDown end={dDay} />
            )}
          </>
        )}
        <Spacer size={32} />
        {goTime && canClaim && !completed && isConnected ? (
          <div style={{ display: "flex", gap: "32px" }}>
            <Button onClick={() => claimToken(1)}>1 BNB</Button>
            {maxIncrementum - parsedIncrementumSold < 2 ? null : (
              <Button onClick={() => claimToken(2)}>2 BNB</Button>
            )}
          </div>
        ) : null}
        {!canClaim ? (
          <>
            <PrivateSaleQuestionTitle>Congratulations</PrivateSaleQuestionTitle>
            <br />
            <MissionSubtitle>
              You&apos;re officially an early supporter of Incrementum Finance.
              Thanks for your support & welcome to the community!
            </MissionSubtitle>
            <br />
            <MissionSubtitle>
              Your $pIncrementum balance: {pIncrementumBalance}
            </MissionSubtitle>
            <br />
          </>
        ) : null}
        <ConnectButton />
      </SaleCard>
    </MainContainer>
  );
};

export default PrivateSale;

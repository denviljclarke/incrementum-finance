import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { Contract, ethers } from "ethers";

import { Title, BaseText } from "../designSystem";
import sizes from "../designSystem/sizes";
import colors from "../designSystem/colors";
import { useWeb3 } from "../contexts/web3-context";
import usePullUp from "../hooks/usePullUp";
import useInterval from "../hooks/useInterval";
import Spacer from "../components/Spacer";
import { JsonRpcProvider } from "@ethersproject/providers";

const MainContainer = styled(Container)`
  padding-top: 40px;
  padding-bottom: 200px;
  @media (max-width: ${sizes.md}px) {
    padding-top: 40px;
    padding-bottom: 80px;
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
  -webkit-text-stroke: 2px #01fd90;
`;

const BNBProgress = styled(Title)`
  font-size: ${32 / 16}rem;
  line-height: 40px;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px #01fd90;

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
  const { connect, address, loading } = useWeb3();

  if (address || loading) {
    return null;
  }

  return <Button onClick={connect}>Connect to a Wallet</Button>;
};

const ProgressBarWrapper = styled.div`
  color: ${colors.Incrementum};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 54px;
  width: 100%;

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
    background: ${colors.Incrementum}29;
  }
  progress[value]::-webkit-progress-value {
    border-radius: 8px;
    background-color: ${colors.Incrementum};
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
}: {
  value: number;
  max?: number;
  completed?: boolean;
}) => {
  return (
    <ProgressBarWrapper>
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

const CountDown = ({
  dDay = new Date(Date.UTC(2021, 10, 19, 18)).getTime(),
}) => {
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
      const timeUntilDay = dDay - now;

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
const dDay = new Date(Date.UTC(2021, 10, 19, 19)).getTime();
// process.env.NODE_ENV === 'development'
//   ? new Date().getTime() + 10000
//   : new Date(Date.UTC(2021, 10, 19, 19)).getTime();

const PrivateSale = () => {
  usePullUp();
  const { signer, address } = useWeb3();

  const [goTime, setGoTime] = React.useState(false);
  const [IncrementumSold, setIncrementumSold] = React.useState(0);
  const [canClaim, setCanClaim] = React.useState(true);
  const [delay] = React.useState(1000);
  const [pause, setPause] = React.useState(false);
  const [pIncrementumBalance, setPIncrementumBalance] = React.useState(0);
  const completed = true;

  const claimToken = async (BNBAmount: string) => {
    const pIncrementumABI = [
      "function claim() external payable",
      "function getTotalRaised() external view returns (uint256)",
    ];

    if (PIncrementum_CONTRACT_ADDRESS && signer) {
      const pIncrementumContract = new Contract(
        PIncrementum_CONTRACT_ADDRESS,
        pIncrementumABI,
        signer
      );

      try {
        const result = await pIncrementumContract.claim({
          value: ethers.utils.parseEther(BNBAmount),
        });
        setCanClaim(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateProgress = async () => {
    const pIncrementumABI = [
      "function claim() external payable",
      "function getTotalRaised() external view returns (uint256)",
      "function hasClaimed() external view returns (bool)",
    ];

    const pubProvider = new JsonRpcProvider(
      "https://bsc-dataseed.binance.org/"
    );

    if (PIncrementum_CONTRACT_ADDRESS) {
      const pIncrementumContract = new Contract(
        PIncrementum_CONTRACT_ADDRESS,
        pIncrementumABI,
        pubProvider
      );

      try {
        const totalRaised = ethers.BigNumber.from(
          await pIncrementumContract.getTotalRaised()
        );
        setIncrementumSold(parseInt(ethers.utils.formatEther(totalRaised)));
      } catch (error) {
        setPause(true);
        console.log(error);
      }
    }
  };

  const updateCanClaim = async () => {
    const pIncrementumABI = [
      "function claim() external payable",
      "function getTotalRaised() external view returns (uint256)",
      "function hasClaimed() external view returns (bool)",
    ];

    if (PIncrementum_CONTRACT_ADDRESS && signer) {
      const pIncrementumContract = new Contract(
        PIncrementum_CONTRACT_ADDRESS,
        pIncrementumABI,
        signer
      );
      try {
        const hasClaimed = await pIncrementumContract.hasClaimed();
        setCanClaim(!hasClaimed);
      } catch (error) {
        setPause(true);
        console.log(error);
      }
    }
  };

  const updateBalance = async () => {
    const pIncrementumABI = [
      "function balanceOf(address account) external view returns (uint256)",
    ];

    if (PIncrementum_CONTRACT_ADDRESS && signer) {
      const pIncrementumContract = new Contract(
        PIncrementum_CONTRACT_ADDRESS,
        pIncrementumABI,
        signer
      );
      try {
        const balance = await pIncrementumContract.balanceOf(address);
        setPIncrementumBalance(parseInt(ethers.utils.formatEther(balance)));
      } catch (error) {
        setPause(true);
      }
    }
  };

  useInterval(
    () => {
      updateProgress();
    },
    completed ? null : delay
  );

  useInterval(
    () => {
      updateBalance();
      updateCanClaim();
    },
    canClaim ? delay : null
  );

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
            early supporter. By participating in this sale you'll become an
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
        {goTime || completed ? (
          <ProgressBar completed={completed} value={IncrementumSold} />
        ) : (
          <CountDown dDay={dDay} />
        )}
        <Spacer size={32} />
        {address && goTime && canClaim && !completed ? (
          <div style={{ display: "flex", gap: "32px" }}>
            <Button onClick={() => claimToken("1")}>1 BNB</Button>
            <Button onClick={() => claimToken("2")}>2 BNB</Button>
          </div>
        ) : null}
        {!canClaim ? (
          <>
            <PrivateSaleQuestionTitle>Congratulations</PrivateSaleQuestionTitle>
            <br />
            <MissionSubtitle>
              You're officially an early supporter of Incrementum Finance.
              Thanks for your support & welcome to the community!
            </MissionSubtitle>
            <br />
            <MissionSubtitle>
              Your $pIncrementum balance: {pIncrementumBalance}
            </MissionSubtitle>
            <br />
          </>
        ) : null}
        {<ConnectButton />}
      </SaleCard>
    </MainContainer>
  );
};

export default PrivateSale;

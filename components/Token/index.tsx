import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

import { Title, BaseText, Button } from "../../designSystem";
import sizes from "../../designSystem/sizes";
import colors from "../../designSystem/colors";

const MainContainer = styled(Container)`
  padding-top: 80px;
  padding-bottom: 80px;
`;

// const MissionText = styled(BaseText)`
//   font-family: VCR;
//   font-size: 12px;
//   line-height: 16px;
//   letter-spacing: 1.5px;
//   text-transform: uppercase;
//   color: ${incrementum};
// `;

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

const MissionSubtitle = styled(BaseText)`
  font-size: 16px;
  line-height: 24px;
  color: ${colors.text};
  text-align: center;
`;
const MissionSubtitleRow = styled(Row)`
  margin-top: 40px;
  justify-content: center;
`;

const TitleAlt = styled(MissionTitle)`
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px #01fd90;
`;

const SectionTitle = styled(Title)`
  font-size: 18px;
  line-height: 32px;
  text-transform: uppercase;
  margin-top: 48px;
  margin-bottom: 24px;
`;

const SmallSectionTitle = styled(SectionTitle)`
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
`;

const CTAButton = styled(Button)`
  &:hover {
    background-color: ${colors.primaryText};
    color: ${colors.background.one};
  }
`;

const Token = () => {
  return (
    <MainContainer>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center">
          <MissionTitle>
            The <TitleAlt>$MOOLA</TitleAlt> Token
          </MissionTitle>
        </Col>
      </Row>
      <Container>
        <MissionSubtitleRow>
          <Col xs={12} md={8} xl={6} className="d-flex">
            <MissionSubtitle>
              The $MOOLA token is redistribution token on the Binance Smart
              Chain. Moola uses smart financial engineering to deliver rewards
              to all holders of the token. Rewards are automatically distributed
              to holders of the token to simplify the process of earning. Once
              Moola farms are launched $MOOLA tokens will be able to be staked
              for additional rewards.
              <ButtonContainer>
                <a
                  href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/November/Moola%20Finance.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <CTAButton>View Audit</CTAButton>
                </a>
              </ButtonContainer>
              <br />
              <br />
              <SmallSectionTitle>Total Supply</SmallSectionTitle>
              <br />
              10,000,000,000 (10 billion)
              <br />
              <br />
              <SmallSectionTitle>8% $BTC Holder Rewards</SmallSectionTitle>
              <br />
              8% of every $MOOLA transaction will be redistriuted to the holders
              of the token. By just holding the token you'll recieve a share of
              $BTC that will be automatically sent to your wallet.
              <br />
              <br />
              <SmallSectionTitle>3% Liquidity Fee</SmallSectionTitle>
              <br />
              3% of every transaction will be added to the PancakeSwap liquidity
              pool to create a stable price floor.
              <br />
              <br />
              <SmallSectionTitle>4% Marketing Fee</SmallSectionTitle>
              <br />
              4% of every transaction will be added to the team operations
              wallet, these funds will be used to fund marketing of the project.
            </MissionSubtitle>
          </Col>
        </MissionSubtitleRow>
      </Container>
    </MainContainer>
  );
};

export default Token;

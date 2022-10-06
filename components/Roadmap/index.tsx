import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

import { Title } from "../../designSystem";
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
//   color: ${colors.moola};
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

// const MissionSubtitle = styled(BaseText)`
//   font-size: 16px;
//   line-height: 24px;
//   color: ${colors.text};
//   text-align: center;
// `;

// const TitleAlt = styled(MissionTitle)`
//   -webkit-text-fill-color: transparent;
//   -webkit-text-stroke: 2px #01fd90;
// `;

const TimeLineContainer = styled.div`
  height: auto;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: ${768 / 16}rem) {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background-color: #1e1f22;
    }
  }
`;

const TimeLineList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TimeLineListItem = styled.li<{ complete?: boolean; current?: boolean }>`
  border: ${(props) => (props?.current ? "2px solid " + colors.moola : "")};
  /* box-shadow: ${(props) =>
    props?.current ? "8px 16px 100px " + colors.moola : ""}; */
  padding: 20px;
  background-color: ${(props) =>
    props?.complete ? colors.moola + 29 : "#1e1f22"};
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${768 / 16}rem) {
    width: 50%;
    position: relative;
    margin-bottom: 50px;

    &:nth-child(odd) {
      float: left;
      clear: right;
      transform: translateX(-30px);
      border-radius: 8px 0px 8px 8px;
    }
    &:nth-child(even) {
      float: right;
      clear: left;
      transform: translateX(30px);
      border-radius: 0px 8px 8px 8px;
    }

    &:before {
      content: "";
      position: absolute;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background-color: ${(props) =>
        props?.current ? colors.moola : "#1e1f22"};
      top: 0px;
    }
    &:nth-child(odd):before {
      transform: translate(50%, -50%);
      right: -30px;
    }
    &:nth-child(even):before {
      transform: translate(-50%, -50%);
      left: -30px;
    }
    &:hover:before {
      background-color: ${colors.moola};
    }
  }
`;

const TimeLineListItemContent = styled.div`
  /* &:h1 {
    font-weight: 500;
    font-size: 25px;
    line-height: 30px;
    margin-bottom: 10px;
  } */
  &:p {
    font-size: 16px;
    line-height: 30px;
    font-weight: 300;
  }
`;

const RoadMapTitle = styled(Title)<{ complete?: boolean }>`
  font-size: 24px;
  color: ${colors.moola};
  /* &:after {
    font-size: 16px;
    
    content: '${(props) => (props.complete ? "- done" : "")}';
  } */
`;

const Done = styled.span`
  font-size: 14px;
  color: ${colors.moola};
  font-family: VCR;
`;

const Roadmap = () => {
  return (
    <MainContainer>
      <div id='roadmap' />
      <Row className='d-flex justify-content-center'>
        <Col className='d-flex justify-content-center'>
          <MissionTitle>Roadmap</MissionTitle>
        </Col>
      </Row>
      <Container>
        <TimeLineContainer>
          <TimeLineList>
            <TimeLineListItem complete>
              <TimeLineListItemContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <RoadMapTitle complete>Phase 0</RoadMapTitle>
                  <Done>- Done</Done>
                </div>
                <p>
                  Conceptualization of Moola Finance, Yield Farms Planning,
                  Landing page launch
                </p>
              </TimeLineListItemContent>
            </TimeLineListItem>
            <TimeLineListItem current>
              <TimeLineListItemContent>
                <RoadMapTitle>Phase 1</RoadMapTitle>
                <p>
                  Token smart contract audit, IDO on Pinksale, launch on
                  Pancakeswap listing on Coingecko, CoinmarketCap
                </p>
              </TimeLineListItemContent>
            </TimeLineListItem>
            <TimeLineListItem complete={false} current={false}>
              <TimeLineListItemContent>
                <RoadMapTitle>Phase 2</RoadMapTitle>
                <p>
                  Aggressive marketing, press-releases, youtube promos, twitter
                  influencers
                </p>
              </TimeLineListItemContent>
            </TimeLineListItem>
            <TimeLineListItem complete={false} current={false}>
              <TimeLineListItemContent>
                <RoadMapTitle>Phase 3</RoadMapTitle>
                <p>
                  Launch of Moola farms, planning/design of BSC Dex aggregator
                </p>
              </TimeLineListItemContent>
            </TimeLineListItem>
          </TimeLineList>
        </TimeLineContainer>
      </Container>
    </MainContainer>
  );
};

export default Roadmap;

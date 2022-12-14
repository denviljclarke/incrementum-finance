import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Title, PrimaryText, Button } from "../../designSystem";
import { Container } from "react-bootstrap";

import sizes from "../../designSystem/sizes";
import colors from "../../designSystem/colors";
import Link from "next/link";

const MainContainer = styled(Container)`
  height: 640px;

  @media (max-width: ${sizes.md}px) {
    height: 540px;
  }
`;

const SubtitleContainer = styled.div`
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
`;

const SubTitle = styled(PrimaryText)`
  color: ${colors.primaryText};
`;

// const BackgroundContainer = styled(Row)`
//   position: absolute;
//   top: 0px;
//   bottom: 0px;
//   right: 0px;
//   left: 0px;

//   @media (max-width: ${sizes.md}px) {
//     display: none;
//   }
// `;

const HeroContainer = styled(Container)`
  position: relative;
`;

const TextContainer = styled(Row)`
  pointer-events: none;
  height: 100%;
  align-items: center;
  text-align: center;
`;

const TitleContainer = styled.div`
  @media (max-width: ${sizes.md}px) {
    display: none;
  }
`;

const TitleContainerMobile = styled.div`
  display: none;
  @media (max-width: ${sizes.md}px) {
    display: flex;
  }
`;

const TitleSmall = styled(Title)`
  font-size: 64px;
`;

const TitleAlt = styled(Title)`
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px #ffd700;
`;

const TitleAltSmall = styled(TitleSmall)`
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px #ffd700;
`;

const CTAButton = styled(Button)`
  &:hover {
    background-color: ${colors.primaryText};
    color: ${colors.background.one};
  }
`;

const Hero = () => {
  return (
    <MainContainer>
      <HeroContainer style={{ position: "relative" }}></HeroContainer>

      <TextContainer>
        <Col>
          <TitleContainer>
            <Title>
              Save Time and <br></br> Earn More Yield <br></br> with{" "}
              <TitleAlt>Incrementum</TitleAlt>
            </Title>
          </TitleContainer>

          <TitleContainerMobile>
            <TitleSmall>
              Save Time and <br></br> Earn More Yield <br></br> with{" "}
              <TitleAltSmall>Incrementum</TitleAltSmall>
            </TitleSmall>
          </TitleContainerMobile>

          <SubtitleContainer>
            <SubTitle>
              Earn more yield on your cryptoassets with a simple autocompunding
              yield optimizer.
            </SubTitle>
          </SubtitleContainer>
          <ButtonContainer>
            <Link href="/private">
              <CTAButton>JOIN PRIVATE SALE</CTAButton>
            </Link>
          </ButtonContainer>
        </Col>
      </TextContainer>
    </MainContainer>
  );
};

export default Hero;

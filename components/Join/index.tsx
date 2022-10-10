import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Title, BaseText } from "../../designSystem";
import { Container } from "react-bootstrap";
import colors from "../../designSystem/colors";

const MainContainer = styled(Container)`
  padding-top: 80px;
  padding-bottom: 160px;
`;

const JoinTitle = styled(Title)`
  font-size: 24px;
  line-height: 32px;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
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

const MissionSubtitle = styled(BaseText)`
  font-size: 16px;
  line-height: 24px;
  color: ${colors.text};
  text-align: center;
`;
const CTAButton = styled(Button)`
  &:hover {
    background-color: ${colors.primaryText};
    color: ${colors.background.one};
  }
`;

const MissionSubtitleRow = styled(Row)`
  margin-top: 40px;
  justify-content: center;
`;

const Join = () => {
  return (
    <MainContainer>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center">
          <JoinTitle>Ready to earn icr?</JoinTitle>
        </Col>
      </Row>
      <Container>
        <MissionSubtitleRow>
          <Col xs={12} md={8} xl={6} className="d-flex">
            <MissionSubtitle>
              Join our community to learn more about Incrmentum and when
              we&apos;ll be launching
            </MissionSubtitle>
          </Col>
        </MissionSubtitleRow>

        <Row className="d-flex justify-content-center">
          <Col className="d-flex justify-content-center">
            <ButtonContainer>
              <a href="#" target="_blank" rel="noreferrer noopener">
                <CTAButton>JOIN TELEGRAM</CTAButton>
              </a>
            </ButtonContainer>
          </Col>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default Join;

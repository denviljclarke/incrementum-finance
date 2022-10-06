import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { SecondaryText, Title } from "../designSystem";
import usePullUp from "../hooks/usePullUp";

const FAQTitle = styled(Title)`
  font-size: 24px;
  line-height: 32px;
  margin-top: 48px;
`;

const SectionTitle = styled(Title)`
  font-size: 18px;
  line-height: 24px;
  text-transform: uppercase;
  margin-top: 48px;
  margin-bottom: 24px;
`;

const SectionQuestion = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: white;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const SectionAnswer = styled(SecondaryText)`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 24px;
`;

const Link = styled.a`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.64);
  text-decoration: underline !important;
`;

const sections = [
  {
    sectionName: "",
    questions: [
      {
        question: "What is Incrementum Finance?",
        answer:
          "Incrementum Finance is a new protocol that aims to creates tools with the aim of making DeFi simple whilst maximising your gains.",
      },
      {
        question: "Does Incrementum have a token?",
        answer: (
          <span>
            <p>
              The $Incrementum token that will be launching on the Binance Smart
              Chain soon. You can find out more about the launch by joining{" "}
              <Link
                href="https://t.me/Incrementumfinance"
                target="_blank"
                rel="noreferrer noopener"
              >
                our telegram group.
              </Link>{" "}
              In future this token will act as our governance to allow community
              members and holders to have a say on the direction of Incrementum.
            </p>
          </span>
        ),
      },
      {
        question: "What tools will you be launching?",
        answer:
          "Our first tool will be a yield optimizer on the Binance Smart Chain. Our farms will be focussed on yield farming strategies that maximise the rewards gained from redistribution tokens. Once this is launched we aim to create an innovative dex aggregator that rewards $Incrementum stakers.",
      },
      {
        question: "Why should I use Incrementum Finance?",
        answer:
          "Incrementum Finance will automatically compound rewards for you multiple times per day so you don't have to, this will save gas and generate higher APY.",
      },
      {
        question: "What is yield farming?",
        answer: (
          <span>
            <p>
              <Link
                href="https://academy.binance.com/en/articles/what-is-yield-farming-in-decentralized-finance-defi"
                target="_blank"
              >
                Yield Farming In DeFi explained.
              </Link>
            </p>
          </span>
        ),
      },
      {
        question: "How does auto compounding on Mooola work?",
        answer: (
          <span>
            <p>
              Deposit your LP tokens into the Incrementum farm that matches your
              token. After you&apos;ve deposited you&apos;ll recieve M tokens
              equivalent to the amount you deposited. The LP rewards will be
              reinvested into the deposited token. Incrementum will take a 10%
              fee of the rewards you recieve as an LP. Compunding happens
              multiple times per day and notifications will be sent to one of
              our community channels.
            </p>
          </span>
        ),
      },
      {
        question:
          "Why do I need to give Incrementum approval to spend my assets?",
        answer: (
          <span>
            <p>
              On the Binance Smart Chain, wallets have full control over their
              BEP-20 tokens. In order to let an application spend a
              wallet&apos;s tokens, the user has to explicitly give permission
              to the application to spend them. This is what&apos;s called an
              BEP-20 allowance. Incrementum will prompt users to approve an
              unlimited amount so that users do not have to re-approve the
              application on a subsequent deposit.
            </p>
          </span>
        ),
      },
      {
        question: "Who is behind Incrementum?",
        answer: (
          <span>
            <p>
              The devs building Incrementum are 0xLoaf {"&"} 0xTail. Our team is
              currently anon. And can be found in{" "}
              <Link
                href="https://t.me/Incrementumfinance"
                target="_blank"
                rel="noreferrer noopener"
              >
                our telegram group.
              </Link>
            </p>
          </span>
        ),
      },
    ],
  },
];

const FAQPage = () => {
  usePullUp();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          xs={11}
          sm={10}
          md={9}
          lg={8}
          xl={7}
          className="d-flex flex-column"
        >
          <FAQTitle>Frequently Asked Questions</FAQTitle>
          {sections.map((section) => (
            <>
              <SectionTitle>{section.sectionName}</SectionTitle>
              {section.questions.map((question) => (
                <>
                  <SectionQuestion>{question.question}</SectionQuestion>
                  <SectionAnswer>{question.answer}</SectionAnswer>
                </>
              ))}
            </>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default FAQPage;

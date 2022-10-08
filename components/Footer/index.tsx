import React, { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

import { BaseLink, Title } from "../../designSystem";
import colors from "../../designSystem/colors";
import sizes from "../../designSystem/sizes";
import theme from "../../designSystem/theme";

const FooterContainer = styled.div`
  display: flex;
  height: 52px;
  width: 100%;
  flex-wrap: nowrap;
  border-top: ${theme.border.width} ${theme.border.style} ${colors.border};

  @media (max-width: ${sizes.lg}px) {
    display: none;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LeftContainer = styled(LinksContainer)`
  margin-right: auto;
`;

const LinkItem = styled.div`
  padding: 0px 24px;
  opacity: 0.48;

  &:hover {
    opacity: 1;
  }
`;

const MobileFooter = styled.div`
  border-top: 1px solid ${colors.borderDark};

  @media (min-width: ${sizes.lg}px) {
    display: none;
  }
`;

const MobileFooterRow = styled(Row)`
  margin-right: 0;
  margin-left: 0;
`;

const MobileFooterCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  @media (max-width: ${sizes.lg}px) {
    padding-top: 27px;
    padding-bottom: 27px;
  }

  @media (min-width: ${sizes.lg}px) {
    && {
      max-width: unset;
      flex: unset;
    }
  }

  @media (min-width: ${sizes.xl}px) {
    max-width: 50%;
  }
`;

const LinkItemText = styled(Title)`
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
`;

const DesktopFooter = () => {
  const renderLinkItem = useCallback(
    (title: string, to: string, external: boolean = false) => (
      <MobileFooterCol xs={6}>
        <BaseLink
          href={to}
          // target={external ? "_blank" : undefined}
          // rel={external ? "noreferrer noopener" : undefined}
        >
          <LinkItem>
            <LinkItemText>{title}</LinkItemText>
          </LinkItem>
        </BaseLink>
      </MobileFooterCol>
    ),
    []
  );

  return (
    <>
      <FooterContainer>
        <LeftContainer>
          {renderLinkItem("FAQS", "/faq")}
          {renderLinkItem("TERMS", "/terms")}
          {renderLinkItem("POLICY", "/policy")}
          {/* {renderLinkItem("DOCS", "#")} */}
        </LeftContainer>
        <div className="d-flex flex-row">
          {renderLinkItem("PRIVATE SALE", "/private")}
          {renderLinkItem("TELEGRAM", "https://t.me/moolafinance", true)}
          {/* {renderLinkItem("DISCORD", "#", true)} */}
          {/* {renderLinkItem("TWITTER", "https://twitter.com/moola_finance", true)} */}
          {renderLinkItem("GITHUB", "https://github.com/moola-finance", true)}
        </div>
      </FooterContainer>

      <MobileFooter>
        <MobileFooterRow>
          {renderLinkItem("FAQS", "/faq")}
          {renderLinkItem("TERMS", "/terms")}
          {renderLinkItem("POLICY", "/policy")}
          {renderLinkItem("PRIVATE SALE", "/private")}
          {renderLinkItem("TELEGRAM", "#", true)}
          {renderLinkItem("TWITTER", "#", true)}
          {renderLinkItem(
            "GITHUB",
            "https://github.com/incrementum-finance",
            true
          )}
        </MobileFooterRow>
      </MobileFooter>
    </>
  );
};

export default DesktopFooter;

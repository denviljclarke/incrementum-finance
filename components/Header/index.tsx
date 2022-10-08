import React, { useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import Logo from "./Logo";
import colors from "../../designSystem/colors";
import sizes from "../../designSystem/sizes";
import { Title, BaseLink } from "../../designSystem";
import MenuButton from "./MenuButton";
import { NavItemProps, MobileMenuOpenProps } from "./types";
import theme from "../../designSystem/theme";
import MobileOverlayMenu from "../Common/MobileOverlayMenu";
import ItemWithDropdown from "./ItemWithDropdown";
import { useRouter } from "next/router";

const HeaderContainer = styled.div<MobileMenuOpenProps>`
  height: ${theme.header.height}px;
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${colors.border};

  @media (max-width: ${sizes.md}px) {
    padding: 16px 24px;
    border-bottom: none;
  }

  z-index: ${(props) => (props.isMenuOpen ? 50 : 10)};
  // The backdrop for the menu does not show up if we enable the backdrop-filter
  // for the header nav. To get around that, just set 'none'
  ${(props) => {
    if (props.isMenuOpen) {
      return null;
    }

    return `
      backdrop-filter: blur(40px);
      /**
       * Firefox desktop come with default flag to have backdrop-filter disabled
       * Firefox Android also currently has bug where backdrop-filter is not being applied
       * More info: https://bugzilla.mozilla.org/show_bug.cgi?id=1178765
       **/
      @-moz-document url-prefix() {
        background-color: rgba(0, 0, 0, 0.9);
      }
    `;
  }}
`;

const LogoContainer = styled.div`
  padding-left: 40px;
  z-index: 1000;

  @media (max-width: ${sizes.md}px) {
    padding-left: 0;
  }
`;

const HeaderAbsoluteContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;

  @media (max-width: ${sizes.md}px) {
    display: none;
  }
`;

const LinksContainer = styled.div`
  display: flex;
`;

const NavItem = styled.div<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 0px 28px;
  height: 100%;
  opacity: ${(props) => (props.isSelected ? "1" : "0.48")};

  &:hover {
    opacity: ${(props) => (props.isSelected ? theme.hover.opacity : "1")};
  }

  @media (max-width: ${sizes.md}px) {
    padding: 0px 0px 40px 48px;
  }
`;

const NavLinkText = styled(Title)`
  letter-spacing: 1.5px;
  font-size: 14px;
  line-height: 20px;

  @media (max-width: ${sizes.md}px) {
    font-size: 24px;
  }
`;

const SecondaryMobileNavItem = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
    padding: 0px 0px 24px 48px;
  }
`;

const SecondaryMobileNavLinktext = styled(Title)`
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.48);
`;

const MobileOnly = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const isOnPrivateSalePage = router.pathname === "/private";

  const onToggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const renderLinkItem = (
    title: string,
    to: string,
    isSelected: boolean,
    primary: boolean = true,
    external: boolean = false
  ) => {
    return (
      <BaseLink
        href={to}
        // target={external ? "_blank" : undefined}
        // rel={external ? "noreferrer noopener" : undefined}
        onClick={onToggleMenu}
      >
        {primary ? (
          <NavItem isSelected={isSelected}>
            <NavLinkText>{title}</NavLinkText>
          </NavItem>
        ) : (
          <SecondaryMobileNavItem>
            <SecondaryMobileNavLinktext>{title}</SecondaryMobileNavLinktext>
          </SecondaryMobileNavItem>
        )}
      </BaseLink>
    );
  };

  return (
    <HeaderContainer
      isMenuOpen={isMenuOpen}
      className="d-flex align-items-center justify-content-between"
    >
      {/* LOGO */}
      <LogoContainer>
        <Logo></Logo>
      </LogoContainer>
      {/* LINKS */}
      <HeaderAbsoluteContainer>
        {isOnPrivateSalePage ? null : (
          <LinksContainer>
            {renderLinkItem("ABOUT", "#about", false)}
            {renderLinkItem("ROADMAP", "#roadmap", false)}

            <ItemWithDropdown
              variant="desktop"
              dropdownItems={[
                {
                  text: "Telegram",
                  link: "https://t.me/moolafinance",
                },
                { text: "Twitter", link: "https://twitter.com/moola_finance" },
              ]}
            >
              <>Community</>
            </ItemWithDropdown>
          </LinksContainer>
        )}
      </HeaderAbsoluteContainer>

      {/* // TODO - Launch app button */}
      {/* <ButtonContainer>
        <a href="#">
          <AppButton>
            <ButtonText>EARN $MOOLA</ButtonText>
          </AppButton>
        </a>
      </ButtonContainer> */}

      {/* MOBILE MENU */}
      <MobileOnly>
        <MenuButton onToggle={onToggleMenu} isOpen={isMenuOpen} />
        <MobileOverlayMenu
          className="flex-column align-items-center justify-content-center"
          isMenuOpen={isMenuOpen}
          onClick={onToggleMenu}
          boundingDivProps={{
            style: {
              marginRight: "auto",
            },
          }}
          style={{ paddingTop: 40 }}
        >
          {renderLinkItem("START EARNING", "#", true)}
          {renderLinkItem(
            "TELEGRAM",
            "https://t.me/moolafinance",
            false,
            false,
            true
          )}
          {renderLinkItem(
            "TWITTER",
            "https://twitter.com/moola_finance",
            false,
            false,
            true
          )}
          {renderLinkItem("ROADMAP", "#roadmap", false, false, false)}
          {/* {renderLinkItem('FAQs', '/faq', false, false, true)}
          {renderLinkItem('POLICY', '/policy', false, false, true)}
          {renderLinkItem('TERMS', '/terms', false, false, true)} */}
        </MobileOverlayMenu>
      </MobileOnly>
    </HeaderContainer>
  );
};

export default Header;

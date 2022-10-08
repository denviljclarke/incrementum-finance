import styled from "styled-components";
import CustomLink from "../Common/Link";

// import { default as AppLogo } from "../../assets/icons/logo";

const LogoContainer = styled.div`
  display: flex;
  border-radius: 48px;
`;

const Logo = () => {
  return (
    <>
      <LogoContainer>
        <CustomLink href="/">HI</CustomLink>
      </LogoContainer>
    </>
  );
};

export default Logo;

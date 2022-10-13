import styled from "styled-components";
import colors from "../../designSystem/colors";
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
        <div
          style={{
            color: colors.incrementum,
            fontFamily: "Helvetica Neue",
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: "2em",
          }}
        >
          <CustomLink href="/">IF</CustomLink>
        </div>
      </LogoContainer>
    </>
  );
};

export default Logo;

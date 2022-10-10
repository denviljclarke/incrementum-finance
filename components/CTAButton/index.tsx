import React from "react";
import styled from "styled-components";
import { Button } from "../../designSystem";
import colors from "../../designSystem/colors";

type Props = {
  children?: React.ReactNode;
};

const CTAButtonStyles = styled(Button)`
  &:hover {
    background-color: ${colors.primaryText};
    color: ${colors.background.one};
  }
`;

const CTAButton: React.FC<Props> = ({ children }) => {
  return <CTAButtonStyles>{children}</CTAButtonStyles>;
};

export default CTAButton;

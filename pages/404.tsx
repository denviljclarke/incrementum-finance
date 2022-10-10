import Link from "next/link";
import React from "react";
import styled from "styled-components";
import CTAButton from "../components/CTAButton";

const ButtonContainer = styled.div`
  margin-top: 40px;
`;

const FourOhFour = () => {
  return (
    <div
      style={{
        color: "white",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ display: "grid", placeItems: "center" }}>
        Oops, nothing to see here
        <ButtonContainer>
          <Link href="/">
            <a>
              <CTAButton>Back to reality</CTAButton>
            </a>
          </Link>
        </ButtonContainer>
      </div>
    </div>
  );
};

export default FourOhFour;

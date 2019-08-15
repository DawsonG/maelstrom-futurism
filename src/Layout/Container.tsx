import styled from "@emotion/styled";
import theme from "../theme";

type tContainer = {
  fluid?: boolean;
};

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  
  padding-left: 1rem;
  padding-right: 1rem;
  
  //@media only screen and (max-width: ${theme.bp("sm")}) {
  //  // Still 100%
  //}
  
  @media only screen and (min-width: ${theme.bp("md")}) {
     max-width: ${(p: tContainer) => (p.fluid ? "100%" : "970px")};
  }
  
  @media only screen and (min-width: ${theme.bp("lg")}) {
    max-width: ${(p: tContainer) => (p.fluid ? "100%" : "1180px")};
  }
`;

export default Container;

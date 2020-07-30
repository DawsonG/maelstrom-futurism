import { css } from "@emotion/core";
import { lighten } from "polished";

import theme from "../theme";

export const navbar = css`
  z-index: ${theme.height("very high")};
  border-bottom: solid 1px ${theme.color("border")};
  box-shadow: 0px 1px 4px ${lighten(0.1, theme.color("border"))};

  @media only print {
    display: none;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${theme.bp("sm")}) {
    flex-direction: column;
    align-items: stretch;
  }

  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${theme.color("trueWhite")};

  &.sticky {
    position: sticky;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
  }
`;

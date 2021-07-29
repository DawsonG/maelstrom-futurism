import { css } from "@emotion/react";

import theme from "../theme";

export const columnListStyle = css`
  position: relative;
  display: table;
  border: solid 1px ${theme.color("border")};
  margin: 16px;

  :before,
  :after {
    content: " ";
    height: 100%;
    position: absolute;
    top: 0;
    width: 15px;
  }

  :before {
    box-shadow: -15px 0 15px -15px inset ${theme.color("border")};
    left: -15px;
  }
  :after {
    box-shadow: 15px 0 15px -15px inset ${theme.color("border")};
    right: -15px;
  }
`;

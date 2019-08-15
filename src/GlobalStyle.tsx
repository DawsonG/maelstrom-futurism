import * as React from "react";
import { Global, css } from "@emotion/core";

import theme from "./theme";

export default () => (
  <Global
    styles={css`
      html {
        box-sizing: border-box;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        padding: 0;
        margin: 0;
        font-family: Roboto, sans-serif;
        font-size: ${theme.size("base")};
        color: ${theme.color("font")};
      }

      .row-element {
        margin-top: 0.5em;
      }
    `}
  />
);

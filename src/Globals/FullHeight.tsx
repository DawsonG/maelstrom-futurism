import * as React from "react";
import { Global, css } from "@emotion/react";

export default () => (
  <Global
    styles={css`
      html,
      body,
      #root {
        height: 100%;
      }
    `}
  />
);

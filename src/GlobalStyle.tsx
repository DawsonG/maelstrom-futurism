import * as React from "react";
import { Global, css } from "@emotion/core";

import theme from "./theme";

export default () => (
  <Global
    styles={css`
      @font-face {
        font-family: "OpenSans";
        src: url("./Typography/fonts/OpenSans-Regular.eot");
        src: url("./Typography/fonts/OpenSans-Regular.eot?iefix") format("eot"),
          url("./Typography/fonts/OpenSans-Regular.woff") format("woff"),
          url("./Typography/fonts/OpenSans-Regular.ttf") format("truetype"),
          url("./Typography/fonts/OpenSans-Regular.svg#webfont") format("svg");
      }

      @font-face {
        font-family: "Roboto";
        src: url("./Typography/fonts/Roboto-Regular.eot");
        src: url("./Typography/fonts/Roboto-Regular.eot?iefix") format("eot"),
          url("./Typography/fonts/Roboto-Regular.woff") format("woff"),
          url("./Typography/fonts/Roboto-Regular.ttf") format("truetype"),
          url("./Typography/fonts/Roboto-Regular.svg#webfont") format("svg");
      }

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

      h1,
      h2,
      h3,
      h4 {
        font-family: OpenSans, Lato, Helvetica, sans-serif;
      }
    `}
  />
);

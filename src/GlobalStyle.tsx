import React from "react";
import { Global, css } from "@emotion/core";

import OpenSansTtf from "./Typography/fonts/OpenSans-Regular.ttf";
import OpenSansWoff from "./Typography/fonts/OpenSans-Regular.woff";
import OpenSansEot from "./Typography/fonts/OpenSans-Regular.eot";
import OpenSansSvg from "./Typography/fonts/OpenSans-Regular.svg";

import RobotoTtf from "./Typography/fonts/Roboto-Regular.ttf";
import RobotoWoff from "./Typography/fonts/Roboto-Regular.woff";
import RobotoEot from "./Typography/fonts/Roboto-Regular.eot";
import RobotoSvg from "./Typography/fonts/Roboto-Regular.svg";

import theme from "./theme";

export default () => (
  <Global
    styles={css`
      @font-face {
        font-family: "OpenSans";
        src: url(${OpenSansEot});
        src: url(${OpenSansEot}) format("eot"),
          url(${OpenSansWoff}) format("woff"),
          url(${OpenSansTtf}) format("truetype"),
          url(${OpenSansSvg}) format("svg");
      }

      @font-face {
        font-family: "Roboto";
        src: url(${RobotoEot});
        src: url(${RobotoEot}) format("eot"), url(${RobotoWoff}) format("woff"),
          url(${RobotoTtf}) format("truetype"), url(${RobotoSvg}) format("svg");
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

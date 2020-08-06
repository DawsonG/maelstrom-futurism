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

      table {
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
        border: none;
        box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
        border-spacing: 0 2px;
        margin: 10px;
      }

      thead > tr > th {
        border-bottom: solid 2px ${theme.color("border")};
        text-align: left;
      }

      tbody > tr:not(:last-child) > td {
        border-bottom: solid 1px ${theme.color("border")};
      }

      th,
      td {
        margin-right: 2px;
        padding: 10px 15px;
      }
    `}
  />
);

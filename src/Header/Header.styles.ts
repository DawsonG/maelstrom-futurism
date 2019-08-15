import { css } from "@emotion/core";
import { lighten } from "polished";

import theme from "../theme";

export const header = css`
  // border-bottom: solid 1px ${theme.color("border")};
  box-shadow: 0px 1px 4px ${lighten(0.1, theme.color("border"))};
  
  &.sticky {
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
  }
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  li {
    float: left;
  }
  
  li a {
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  
  li a:hover {
    background-color: #ddd;
  }
  
  .active {
    background-color: #4CAF50;
  }
`;

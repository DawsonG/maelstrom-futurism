import React from "react";
import { css } from "@emotion/react";

import theme from "../../theme";

const menuToggle = css`
  display: none;

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${theme.bp("md")}) {
    justify-self: end;
    display: block;
    cursor: pointer;
    margin-right: 25px;
    order: 1;
  }
`;

const bar = css`
  width: 25px;
  height: 3px;
  background-color: #3f3f3f;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: ${theme.bp("md")}) {
    display: block;
  }
`;

const MenuToggle = ({ onClick }: { onClick: any }) => (
  <div css={menuToggle} onClick={onClick}>
    <span css={bar} />
    <span css={bar} />
    <span css={bar} />
  </div>
);

export default MenuToggle;

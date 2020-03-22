// Not in typescript because dynamic tags get really tricky
import React from "react";
import { css } from "@emotion/core";

import theme from "../../theme";

const style = css`
  display: inline-block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor: pointer;

  @media only screen and (max-width: ${theme.bp("sm")}) {
    display: block;
    text-align: left;
  }

  &:hover {
    background-color: #ddd;
  }

  .active {
    background-color: #4caf50;
  }
`;

const Link = ({ tag = "a", children, ...rest }) => {
  const CustomTag = tag;

  return (
    <CustomTag css={style} {...rest}>
      {children}
    </CustomTag>
  );
};

export default Link;

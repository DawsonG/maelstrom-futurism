import React from "react";
import { css } from "@emotion/react";

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

interface ILink {
  tag?: React.ElementType | string;
  children?: React.ReactChildren;
}

const Link: React.FC<ILink> = ({ tag = "a", children, ...rest }) => {
  const CustomTag = tag as React.ElementType;

  return (
    <CustomTag css={style} {...rest}>
      {children}
    </CustomTag>
  );
};

export default Link;

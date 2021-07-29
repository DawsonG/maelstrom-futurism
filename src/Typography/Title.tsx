import React from "react";
import { css } from "@emotion/react";

import theme from "../theme";

const titleWrapper = css`
  width: 100%;
  padding-bottom: ${theme.space[0]}px;
  border-bottom: solid 1px ${theme.color("border")};
`;

const titleStyle = css`
  margin: 0;
`;

interface ITitle {
  children: React.ReactChildren;
}

const Title: React.FC<ITitle> = ({ children }) => (
  <div css={titleWrapper}>
    <h1 css={titleStyle}>{children}</h1>
  </div>
);

export default Title;

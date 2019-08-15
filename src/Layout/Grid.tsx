import React from "react";
import { css } from "@emotion/core";

const gridStyle = css`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
`;

const Grid = ({ children }) => <div css={gridStyle}>{children}</div>;

export default Grid;

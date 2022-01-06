import React from "react";
import { css } from "@emotion/react";

const gridStyle = css`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
`;

interface IGrid {
  children?: React.ReactChildren;
}

const Grid: React.FC<IGrid> = ({ children }) => <div css={gridStyle}>{children}</div>;

export default Grid;

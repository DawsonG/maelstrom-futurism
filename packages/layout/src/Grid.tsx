import React, { HTMLAttributes } from "react";
import { css } from "@emotion/react";

const gridStyle = css`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
`;

const Grid = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>): JSX.Element => <div css={gridStyle} {...rest}>{children}</div>;

export default Grid;

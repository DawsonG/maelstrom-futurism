import React, { HTMLAttributes } from "react";
import { css } from "@emotion/react";
import { Direction } from "@maelstrom-futurism/core";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
}

const Grid = ({ children, direction, ...rest }: GridProps): JSX.Element => {
  const gridStyle = css`
    display: flex;
    flex: 0 1 auto;
    flex-direction: ${direction?.valueOf() || 'row'};
    flex-wrap: wrap;
    margin-right: -0.5rem;
    margin-left: -0.5rem;
  `;

  return <div css={gridStyle} {...rest}>{children}</div>;
}
  

export default Grid;

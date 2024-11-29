import React, { HTMLAttributes } from "react";
import { css } from "@emotion/react";
import { Direction, JustifyContent } from "@maelstrom-futurism/core";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  justifyContent?: JustifyContent;
}

const Grid = ({ children, direction, justifyContent, ...rest }: GridProps): JSX.Element => {
  const gridStyle = css`
    display: flex;
    flex: 0 1 auto;
    flex-direction: ${direction || 'row'};
    flex-wrap: wrap;
    ${justifyContent && `justify-content: ${justifyContent};`}
    margin-right: -0.5rem;
    margin-left: -0.5rem;
  `;

  return <div css={gridStyle} {...rest}>{children}</div>;
}
  

export default Grid;

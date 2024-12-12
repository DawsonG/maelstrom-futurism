import { css } from "@emotion/react";
import { Box, BoxProps } from "@maelstrom-futurism/core";

export type JustifyContent = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
export type Direction = 'column' | 'row';

export interface GridProps extends Omit<BoxProps, 'css'> {
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

  return <Box css={gridStyle} {...rest}>{children}</Box>;
}
  

export default Grid;

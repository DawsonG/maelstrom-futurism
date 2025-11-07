import { css } from "@emotion/react";
import { Box, BoxProps } from "@maelstrom-futurism/core";
import { ReactNode, ReactElement } from "react";
import Column, { ColumnProps } from "./Column";

export type JustifyContent = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
export type Direction = 'column' | 'row';

export interface GridProps extends Omit<BoxProps, 'css' | 'children' | 'primative'> {
    direction?: Direction;
    justifyContent?: JustifyContent;
    children: ReactElement<ColumnProps>[]
}

const Grid = ({ children, direction, justifyContent, ...rest }: GridProps): ReactNode => {
    /**
     * Test to make sure this layout is following the rules
     * 1) Only Columns can be children
     * 2) There are 12 columns split between up to 12 Columns
     */ 
    /*
    const arrayChildren = Children.toArray(children);
    // let columnCount = 0;
    arrayChildren.forEach(child => {
        // Ensure we're looking at a column
        if (!(child instanceof Column)) {
            throw new Error('All direct children of <Grid/> must be <Column/>');
        }

        // const childProps = child.props as ColumnProps;
        // columnCount += childProps.xs;
    });
    */

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

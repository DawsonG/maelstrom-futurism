import { HTMLAttributes, ReactNode } from "react";
import { css } from "@emotion/react";
import { useTheme } from "@maelstrom-futurism/core";

export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
    children?: any;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    topBorder?: boolean | string;
    bottomBorder?: boolean | string;
    leftBorder?: boolean | string;
    rightBorder?: boolean | string;
}

function borderWrite(bName: string, color: string, bVar?: boolean | string) {
    if (!bVar) return;

    if (typeof bVar === "boolean" && bVar) {
        return `${bName}: solid 1px ${color};`;
    }

    return `${bName}: ${bVar};`;
}

const Column = ({
    children,
    xs,
    sm,
    md,
    lg,
    topBorder,
    bottomBorder,
    leftBorder,
    rightBorder,
    ...rest
}: ColumnProps): ReactNode => {
    const theme = useTheme();
    const baseWidth = 8.33333333;

    /**
     * If one of these values is null we attempt to use the next largest so on until the largest size.
     * If no larger sizes are available we default to the smaller values.
     */
    const xsWidth = xs ? baseWidth * xs + "%" : null;
    const smWidth = sm ? baseWidth * sm + "%" : null;
    const mdWidth = md ? baseWidth * md + "%" : null;
    const lgWidth = lg ? baseWidth * lg + "%" : null;

    const style = css`
        box-sizing: border-box;
        flex: 0 0 auto;
        padding-right: 0.5rem;
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;

        ${topBorder ? `border-top: ${topBorder}` : ""}

        @media only screen and (min-width: ${theme.bp("xs")}) {
          flex-basis: ${xsWidth || smWidth || mdWidth || lgWidth};
          max-width: ${xsWidth || smWidth || mdWidth || lgWidth};
        }

        @media only screen and (min-width: ${theme.bp("sm")}) {
          flex-basis: ${smWidth || mdWidth || lgWidth || xsWidth};
          max-width: ${smWidth || mdWidth || lgWidth || xsWidth};
        }

        @media only screen and (min-width: ${theme.bp("md")}) {
          flex-basis: ${mdWidth};
          max-width: ${mdWidth};
        }

        @media only screen and (min-width: ${theme.bp("lg")}) {
          flex-basis: ${lgWidth};
          max-width: ${lgWidth};
        }

        ${!xsWidth && !smWidth && !mdWidth && !lgWidth && "flex: 1 0 0;"}

        ${borderWrite("border-top", theme.color("secondary"), topBorder)}
        ${borderWrite("border-right", theme.color("secondary"), rightBorder)}
        ${borderWrite("border-bottom", theme.color("secondary"), bottomBorder)}
        ${borderWrite("border-left", theme.color("secondary"), leftBorder)}
    `;

    return (
        <div css={style} {...rest}>
            {children}
        </div>
    );
};

export default Column;

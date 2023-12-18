import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import { useTheme } from "@maelstrom-futurism/theme";

interface ContainerProps {
  fluid?: boolean;
  children?: ReactNode;
  [rest: string]: any;
};

const Container = ({ fluid, children, ...rest }: ContainerProps): JSX.Element => {
  const theme = useTheme();

  return (
    <div
      css={css`
        margin: 0 auto;
        width: ${fluid ? "100%" : "1180px"};

        padding-left: 1rem;
        padding-right: 1rem;

        @media only screen and (max-width: ${theme.bp("sm")}) {
          width: 100%;
        }

        @media only screen and (min-width: ${theme.bp("md")}) {
          max-width: ${fluid ? "100%" : "970px"};
        }

        @media only screen and (min-width: ${theme.bp("lg")}) {
          max-width: ${fluid ? "100%" : "1180px"};
        }
      `}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;

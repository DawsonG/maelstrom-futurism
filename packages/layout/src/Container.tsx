import { ReactNode } from "react";
import { css } from "@emotion/react";
import { useTheme } from "@maelstrom-futurism/core";

interface ContainerProps {
  fluid?: boolean;
  children?: ReactNode;
  margin?: string;
  maxWidth?: string;
  [rest: string]: any;
};

const Container = ({ fluid, children, margin, maxWidth, ...rest }: ContainerProps): JSX.Element => {
  const theme = useTheme();
  let fWidth;
  if (fluid) {
    fWidth = '100%';
  }
  if (maxWidth) {
    fWidth = maxWidth;
  }

  return (
    <div
      css={css`
        margin: ${margin ? margin : '0 auto'};
        width: ${fWidth};

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

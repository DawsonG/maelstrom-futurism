import React, { ReactNode } from "react";
import { css } from "@emotion/react";

interface IBrand {
  children?: ReactNode;
}

const style = css`
  display: inline-block;
  font-weight: bolder;
  padding: 14px 20px 14px 16px;
`;

const Brand: React.FC<IBrand> = ({ children }) => (
  <div css={style}>{children}</div>
);

export default Brand;

import React, { ReactNode } from "react";
import { css } from "@emotion/react";

const style = css``;

const Group = ({ children }: { children?: ReactNode }) => (
  <div css={style}>{children}</div>
);

export default Group;

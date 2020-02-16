import React, { ReactNode } from "react";

interface ITypography {
  children?: ReactNode;
}

const Typography = ({ children }: ITypography) => <span>{children}</span>;

export default Typography;

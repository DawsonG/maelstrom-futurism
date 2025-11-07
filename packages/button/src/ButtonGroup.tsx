import { ReactNode } from "react";
// import Button from "./Button";
import { buttonGroupStyle } from "./Button.styles";

interface ButtonGroupProps {
    children?: ReactNode
}

const ButtonGroup = ({ children }: ButtonGroupProps): ReactNode => (
    <div css={buttonGroupStyle}>
        {children}
    </div>
);

export default ButtonGroup;
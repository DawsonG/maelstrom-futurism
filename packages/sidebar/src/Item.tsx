import { ReactNode } from "react";
import { css } from "@emotion/react";

const menuItemContainer = css`
    display: flex;
    justify-content: space-between;
`;

export interface ItemProps {

}

const Item = ({}: ItemProps): ReactNode => <div css={menuItemContainer} />
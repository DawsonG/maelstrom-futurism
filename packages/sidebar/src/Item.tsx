import { css } from "@emotion/react";

const menuItemContainer = css`
    display: flex;
    justify-content: space-between;
`;

export interface ItemProps {

}

const Item = ({}: ItemProps): JSX.Element => <div css={menuItemContainer} />
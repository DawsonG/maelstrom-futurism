import { css } from "@emotion/react";

const menuItemContainer = css`
    display: flex;
<<<<<<< HEAD
    flex-direction: ;
    justify-content: space-between;
`;

interface ItemProps {
=======
    justify-content: space-between;
`;

export interface ItemProps {
>>>>>>> 1fd1082 (additional init commit)

}

const Item = ({}: ItemProps): JSX.Element => <div css={menuItemContainer} />
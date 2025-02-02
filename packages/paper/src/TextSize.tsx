import { css } from "@emotion/react";

const stylelessBtn = css`
    border: 0;
    background: none;
`;

const smallerButton = css`
    ${stylelessBtn}
    font-size: 0.7rem;
`;

const largerButton = css`
    ${stylelessBtn}
    font-size: 1.3rem;
`

interface TextSizeProps {}

const TextSize = (): JSX.Element => <div>
    <button css={smallerButton}>A</button>
    <button css={largerButton}>A</button>
</div>;

export default TextSize;
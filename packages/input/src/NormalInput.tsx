import { css } from "@emotion/react";

import { useTheme } from "@maelstrom-futurism/core";
import { InputProps } from "./Input";
import { normalStyledInput } from "./NormalStyles";

const NormalInput = ({
    label,
    name,
    value,
    type,
    forwardedRef,
    multiline,
    ...restProps
}: InputProps): JSX.Element => {
    const theme = useTheme();

    const fcContainer = css`
        margin-top: 0.5em;
    `;

    return (
        <div css={fcContainer}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                ref={forwardedRef}
                value={value}
                css={normalStyledInput(theme)}
                {...restProps}
            />
        </div>
    );
};

export default NormalInput;

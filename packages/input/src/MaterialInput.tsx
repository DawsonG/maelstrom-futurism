import { css } from "@emotion/react";

import { useTheme } from "@maelstrom-futurism/core";
import { InputProps } from "./Input";

const fcContainer = css`
  position: relative;
  margin-top: 15px;
`;

const labelCss = css`
  position: absolute;
  pointer-events: none;
  left: 0px;
  top: 10px;
  font-size: 0.75em;
  opacity: 0;
  transition: 0.3s ease all;
`;

const MaterialInput = ({ type, name, label, forwardedRef, ...restProps }: InputProps): JSX.Element => {
  const theme = useTheme();
  const styledInput = css`
    border: none;
    border-bottom: solid 2px ${theme.color("secondary")};
    padding: 0.5em 0.25em;
    width: 100%;
    font-size: 1em;
    background-color: transparent;
    color: ${theme.color("primary")};

    :focus ~ label,
    :valid ~ label {
      top: -14px;
      font-size: 0.75em;
      opacity: 1;
    }

    :active,
    :focus {
      border: none;
      outline: none;

      border-bottom: solid 2px ${theme.color("primary")};

      ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        transition: 0.2s;
        color: #fff;
      }
      ::-moz-placeholder {
        /* Firefox 19+ */
        transition: 0.2s;
        color: #fff;
      }
      :-ms-input-placeholder {
        /* IE 10+ */
        transition: 0.2s;
        color: #fff;
      }
      :-moz-placeholder {
        /* Firefox 18- */
        transition: 0.2s;
        color: #fff;
      }
    }

    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: ${theme.color("secondary")};
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: ${theme.color("secondary")};
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: ${theme.color("secondary")};
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: ${theme.color("secondary")};
    }
  `;

  return (
    <div css={fcContainer}>
      <input
        id={name}
        name={name}
        type={type}
        ref={forwardedRef}
        css={styledInput}
        {...restProps}
      />
      {label && (
        <label css={labelCss} htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  );
}

export default MaterialInput;

import React, { PureComponent } from "react";
import { css } from "@emotion/react";

import { useTheme } from "@maelstrom-futurism/core";

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

interface InputProps {
  /**
   * A valid HTML5 type. (Required)
   */
  type: string;

  /**
   * A unique (in form) field name (Required)
   */
  name: string;

  /**
   * The label to display above the input.  Leave blank to hide.
   */
  label?: string;

  /**
   * Text to use as a placeholder
   */
  placeholder?: string;

  /**
   * Is this form field required to postback
   */
  required?: boolean;

  /**
   * Use textarea?
   */
  multiline?: boolean;

  forwardedRef?: any;
}

const MaterialInput = ({ type, name, label, forwardedRef, ...restProps }: InputProps): JSX.Element => {
  const theme = useTheme();
  const styledInput = css`
    border: none;
    border-bottom: solid 2px ${theme.color("secondary")};
    padding: 0.5em 0.25em;
    width: 100%;
    font-size: 1em;

    :focus ~ label,
    :valid ~ label {
      top: -14px;
      font-size: 0.75em;
      opacity: 1;
      color: ${theme.color("primary")};
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

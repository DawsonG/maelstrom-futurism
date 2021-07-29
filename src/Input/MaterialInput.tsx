import React, { PureComponent } from "react";
import { css } from "@emotion/react";

import theme from "../theme";

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

const styledInput = css`
  border: none;
  border-bottom: solid 2px ${theme.color("border")};
  padding: 0.5em 0.25em;
  width: 100%;
  font-size: 1em;

  :focus ~ label,
  :valid ~ label {
    top: -14px;
    font-size: 0.75em;
    opacity: 1;
    color: ${theme.color("active")};
  }

  :active,
  :focus {
    border: none;
    outline: none;

    border-bottom: solid 2px ${theme.color("active")};

    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      transition: 0.2s;
      color: ${theme.color("trueWhite")};
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      transition: 0.2s;
      color: ${theme.color("trueWhite")};
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      transition: 0.2s;
      color: ${theme.color("trueWhite")};
    }
    :-moz-placeholder {
      /* Firefox 18- */
      transition: 0.2s;
      color: ${theme.color("trueWhite")};
    }
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: ${theme.color("muted")};
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: ${theme.color("muted")};
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: ${theme.color("muted")};
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: ${theme.color("muted")};
  }
`;

interface InputInterface {
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

class MaterialInput extends PureComponent<InputInterface> {
  render() {
    const { type, name, label, forwardedRef, ...restProps } = this.props;

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
}

export default MaterialInput;

import React, { PureComponent } from "react";
import { css } from "@emotion/core";
import { lighten } from "polished";

import theme from "../theme";

const fcContainer = css`
  margin-top: 0.5em;
`;

const styledInput = css`
  border: solid 1px ${theme.color("border")};
  border-radius: 4px;
  padding: 0.5em 1em;
  width: 100%;
  font-size: 1em;
  box-shadow: inset 1px 1px 4px ${lighten(0.1, theme.color("border"))};

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
   * Use textarea?
   */
  multiline?: boolean;

  /**
   * Literal input value for use outside traditional form
   */
  value?: string;

  /**
   * Value used for preloaded state
   */
  defaultValue?: string;

  forwardedRef?: any;
}

class Input extends PureComponent<InputInterface> {
  render() {
    const { type, name, label, value, forwardedRef, ...restProps } = this.props;

    return (
      <div css={fcContainer}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          name={name}
          type={type}
          ref={forwardedRef}
          css={styledInput}
          {...restProps}
        />
      </div>
    );
  }
}

export default Input;

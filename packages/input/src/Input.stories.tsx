import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import Input from "./";

storiesOf("Form", module)
  .add("Input - Text - singleline", () => (
    <Fragment>
      <Input
        type="text"
        name="singleline"
        placeholder="Text input"
        label="Basic input"
      />
    </Fragment>
  ))
  .add("Text - multiline", () => (
    <Fragment>
      <Input type="text" name="multiline" multiline />
    </Fragment>
  ))
  .add("Text - MaterialInput", () => (
    <Fragment>
      <Input
        type="text"
        name="materialInput"
        variant="material"
        placeholder="Click Here..."
        label="Material Input"
        required
      />
    </Fragment>
  ));

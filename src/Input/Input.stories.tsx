import React from "react";
import { storiesOf } from "@storybook/react";

import Form from "../Form";
import Input from "./";

storiesOf("Input", module)
  .add("Text - singleline", () => (
    <Form>
      <Input
        type="text"
        name="singleline"
        placeholder="Text input"
        label="Basic input"
      />
    </Form>
  ))
  .add("Text - multiline", () => (
    <Form>
      <Input type="text" name="multiline" multiline />
    </Form>
  ))
  .add("Text - MaterialInput", () => (
    <Form>
      <Input
        type="text"
        name="materialInput"
        variant="material"
        placeholder="Click Here..."
        label="Material Input"
        required
      />
    </Form>
  ));

import React from "react";
import { storiesOf } from "@storybook/react";

import FormBuilder from ".";

const formModel = [
  {
    name: "name",
    contentType: "text"
  },
  {
    name: "phone number",
    contentType: "tel"
  }
];

storiesOf("Form", module).add("FormBuilder - No Values", () => (
  <FormBuilder model={formModel} />
));

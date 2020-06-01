import * as React from "react";
import { storiesOf } from "@storybook/react";

import Button from "./Button";

storiesOf("Button", module).add("ripple demo", () => (
  <div style={{ width: "500px" }}>
    <Button>Alert</Button>
  </div>
));

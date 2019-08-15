import * as React from "react";
import { storiesOf } from "@storybook/react";

import Container from "../Layout/Container";
import Annotator from "./Annotator";

storiesOf("Annotator", module).add("Basic", () => (
  <Container>
    <Annotator
      name="basic"
      entityLabels={[
        { name: "City", color: "#0000ff" },
        { name: "Region", color: "#ff0000" }
      ]}
      example={{ id: "test", text: "", entities: [] }}
    />
  </Container>
));

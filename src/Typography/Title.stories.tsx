import React from "react";
import { storiesOf } from "@storybook/react";

import { Container } from "../Layout";
import Typography, { Title } from ".";

storiesOf("Typography", module).add("Headings and Titles", () => (
  <Container>
    <Title>Test</Title>

    <div>
      <p>Some test content</p>
      <Typography></Typography>
    </div>
  </Container>
));

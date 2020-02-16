import React from "react";
import { storiesOf } from "@storybook/react";

import Paper from "../Paper";
import Input from "../Input";
import Button from "../Button";

storiesOf("Pages etc", module).add("Login", () => (
  <Paper width="450px" centered>
    <h1>Login</h1>
    <form>
      <Input
        name="Username"
        label="Username"
        placeholder="Username..."
        type="text"
        variant="material"
        required
      />
      <Input
        name="Password"
        label="Password"
        placeholder="Password..."
        type="password"
        variant="material"
        required
      />

      <Button type="submit" variant="primary" scale="normal">
        Sign In
      </Button>
    </form>
  </Paper>
));

import * as React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Form from "./Form";

storiesOf("Form", module).add("to Storybook", () => <Form />);
/*
storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
*/

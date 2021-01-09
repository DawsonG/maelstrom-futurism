import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import Button from "../Button";
import useModal from "./useModal";

storiesOf("Modal", module).add("Standard Modal", () => {
  const [toggle, Modal] = useModal();

  return (
    <Fragment>
      <Button onClick={toggle}>Open Modal</Button>
      <br />
      <Button onClick={toggle}>Open Modal</Button>
      <br />
      <Button onClick={toggle}>Open Modal</Button>
      <br />
      <Button onClick={toggle}>Open Modal</Button>
      <br />
      <Button onClick={toggle}>Open Modal</Button>
      <br />
      <Button onClick={toggle}>Open Modal</Button>
      <br />
      <Button onClick={toggle}>Open Modal</Button>
      <br />
      <Button onClick={toggle}>Open Modal</Button>
      <Modal title="A quick modal">Content</Modal>
    </Fragment>
  );
});

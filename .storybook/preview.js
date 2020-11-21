import React, { Fragment } from "react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

import GlobalStyle from "../src/GlobalStyle";

export const parameters = {
  viewport: {
    viewports: MINIMAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: "responsive"
  }
};

export const decorators = [
  Story => (
    <Fragment>
      <GlobalStyle />
      <Story />
    </Fragment>
  )
];

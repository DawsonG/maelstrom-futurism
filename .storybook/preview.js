import React, { Fragment } from "react";

import GlobalStyle from "../src/GlobalStyle";

export const decorators = [
  Story => (
    <Fragment>
      <GlobalStyle />
      <Story />
    </Fragment>
  )
];

import React, { Fragment } from "react";

import GlobalStyle from "../src/GlobalStyle";

export default storyFn => (
  <Fragment>
    <GlobalStyle />
    {storyFn()}
  </Fragment>
);

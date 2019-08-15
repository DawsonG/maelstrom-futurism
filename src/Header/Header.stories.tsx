import React from "react";
import { storiesOf } from "@storybook/react";
import { css } from "@emotion/core";

import Header from "./";

const banner = css`
  background: url(${require("../../resources/desert_vegetation_mountains_clouds.jpg")});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px;
`;

storiesOf("Header", module).add("Normal Sticky", () => (
  <div style={{ width: "100%" }}>
    <div css={banner} />
    <Header />
    <p>1. Lots of text.</p>
    <p>2. Lots of text.</p>
    <p>3. Lots of text.</p>
    <p>4. Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
    <p>Lots of text.</p>
  </div>
));

import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { css } from "@emotion/react";

import { Container, Grid, Column } from "./";

const boxStyle = css`
  width: 100%;
  background-color: #007fff;
  min-height: 2rem;
`;

storiesOf("Layout", module).add("Column Demo", () => (
  <Fragment>
    <Container fluid>
      <h1>Fluid Container - Sized Columns</h1>
      <Grid>
        <Column sm={12} md={3} lg={1}>
          <div css={boxStyle} />
        </Column>
        <Column sm={2} md={3} lg={4}>
          <div css={boxStyle} />
        </Column>
        <Column sm={5} md={3} lg={4}>
          <div css={boxStyle} />
        </Column>
        <Column sm={5} md={3} lg={3}>
          <div css={boxStyle} />
        </Column>
      </Grid>
    </Container>

    <Container fluid>
      <h1>Fluid Container - Even Columns</h1>
      <Grid>
        <Column>
          <div css={boxStyle} />
        </Column>
        <Column>
          <div css={boxStyle} />
        </Column>
        <Column>
          <div css={boxStyle} />
        </Column>
      </Grid>
    </Container>

    <Container>
      <h1>Container - Sized Columns</h1>
      <Grid>
        <Column sm={6} md={3}>
          <div css={boxStyle} />
        </Column>
        <Column sm={6} md={3}>
          <div css={boxStyle} />
        </Column>
        <Column sm={6} md={3}>
          <div css={boxStyle} />
        </Column>
        <Column sm={6} md={3}>
          <div css={boxStyle} />
        </Column>
      </Grid>
    </Container>

    <Container>
      <h1>Container - Even Columns</h1>
      <Grid>
        <Column>
          <div css={boxStyle} />
        </Column>
        <Column>
          <div css={boxStyle} />
        </Column>
        <Column>
          <div css={boxStyle} />
        </Column>
      </Grid>
    </Container>
  </Fragment>
));

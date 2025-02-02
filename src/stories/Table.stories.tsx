import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Tables", module).add("Rational Defaults", () => (
  <table>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Value 1</td>
        <td>Value 2</td>
        <td>Value 3</td>
      </tr>

      <tr>
        <td>Value 1</td>
        <td>Value 2</td>
        <td>Value 3</td>
      </tr>

      <tr>
        <td>Value 1</td>
        <td>Value 2</td>
        <td>Value 3</td>
      </tr>
    </tbody>
  </table>
));

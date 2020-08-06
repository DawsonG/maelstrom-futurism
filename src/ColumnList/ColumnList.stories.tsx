import React from "react";
import { storiesOf } from "@storybook/react";

import ColumnList from "./ColumnList";

const data = [{}];

storiesOf("Tables", module).add("ColumnList", () => <ColumnList data={data} />);

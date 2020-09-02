import * as React from "react";
import { storiesOf } from "@storybook/react";

import Container from "../Layout/Container";
import Annotator from "./Annotator";

storiesOf("Annotator", module)
  .add("Basic", () => (
    <Container>
      <div>
        <p>
          Annotators are used for identifying parts of speech, named entity
          recognition, and more in{" "}
        </p>

        <Annotator
          name="basic"
          entityLabels={[
            { name: "City", color: "#0000ff" },
            { name: "Region", color: "#ff0000" }
          ]}
        />
      </div>

      <div>
        <Annotator
          name="basic"
          entityLabels={[
            { name: "City", color: "#0000ff" },
            { name: "Region", color: "#ff0000" }
          ]}
          value="This annotator starts with a value."
        />
      </div>

      <div>
        <p>
          Annotators don't have to be editable. You can just use them for
          annotating and not creating content.
        </p>
        <Annotator
          name="basic"
          entityLabels={[
            { name: "Noun", color: "#0000ff" },
            { name: "Verb", color: "#ff0000" }
          ]}
          defaultEntities={[
            {
              start: 5,
              end: 13,
              value: "annotator",
              label: { name: "Noun", color: "#0000ff" }
            },
            {
              start: 20,
              end: 23,
              value: "has",
              label: { name: "Verb", color: "#ff0000" }
            }
          ]}
          isEditable={false}
          value="This annotator also has default entities!"
        />
      </div>
    </Container>
  ))
  .add("Only One", () => (
    <Annotator
      name="basic"
      entityLabels={[
        { name: "Noun", color: "#0000ff" },
        { name: "Verb", color: "#ff0000" }
      ]}
      defaultEntities={[
        {
          start: 5,
          end: 14,
          value: "annotator",
          label: { name: "Noun", color: "#0000ff" }
        },
        {
          start: 20,
          end: 23,
          value: "has",
          label: { name: "Verb", color: "#ff0000" }
        }
      ]}
      isEditable={false}
      value="This annotator also has default entities!"
    />
  ));

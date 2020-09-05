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
          recognition, and more! They're ideal for Machine Learning applications
          and the management of datasets.
        </p>

        <div>
          <strong>Try selecting the city and state and labeling them.</strong>
          <br />
          <Annotator
            name="basic"
            entityLabels={[
              { name: "City", color: "#0000ff" },
              { name: "State", color: "#ff0000" }
            ]}
            value="I live in Seattle, Washington."
            isEditable={false}
          />
        </div>
      </div>

      <div>
        <p>Annotator values can also be edited.</p>

        <Annotator
          name="basic"
          entityLabels={[
            { name: "Noun", color: "#0000ff" },
            { name: "Verb", color: "#ff0000" }
          ]}
          value="This annotator starts with a value, but you can edit it."
        />
      </div>

      <div>
        <p>
          Annotators can also be used to edit existing entities. This Annotator
          includes not only text but pre-selected entities!
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
          end: 15,
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

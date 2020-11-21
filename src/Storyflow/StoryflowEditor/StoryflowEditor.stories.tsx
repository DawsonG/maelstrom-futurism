import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { IStoryflow } from "../Storyflow.interfaces";
import StoryflowEditor from "./StoryflowEditor";

const stories: IStoryflow = {
  stories: {
    "0": {
      id: "0",
      title: "ONE",
      content: "first box",
      physicalXY: [16, 192]
    },
    "1": {
      id: "1",
      title: "TWO",
      content: "second box",
      physicalXY: [288, 192]
    },
    "2": {
      id: "2",
      title: "THREE",
      content: "third box",
      physicalXY: [224, 256]
    }
  },
  connections: [
    {
      source: "0",
      target: "1",
      direction: "one-way"
    }
  ]
};

storiesOf("StoryflowEditor-", module).add("Basic", () => (
  <StoryflowEditor storyflow={stories} />
));

/*
  .add("With Managed State", () => {
    const [localStories, setStories] = useState(stories);

    const onChange = (boxes: IStoryMap) => {
      setStories(boxes);
    };
  
    return (
      <div>
        <StoryflowEditor onChange={onChange} stories={stories} />
        <pre>
          {JSON.stringify(localStories, null, 2)}
        </pre>
      </div>
    );
  }
);
*/

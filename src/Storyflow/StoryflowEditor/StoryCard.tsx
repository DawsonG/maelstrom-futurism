import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { BsArrowsMove } from "react-icons/bs";

import {
  storyContainer,
  storyDndPreview,
  titleStyle,
  handleStyle
} from "./StoryflowEditor.styles";
import { IStory } from "../Storyflow.interfaces";

const getLocationStyle = (physicalXY: Array<Number>) => ({
  left: `${physicalXY[0]}px`,
  top: `${physicalXY[1]}px`
});

const getOpacity = (isDragging: boolean) => ({
  opacity: isDragging ? 0 : 1
});

const StoryCard: React.FC<IStory> = ({ id, title, content, physicalXY }) => {
  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { type: "CARD", id, title, content, physicalXY },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      id={id}
      key={id}
      css={[
        storyContainer,
        getLocationStyle(physicalXY),
        getOpacity(isDragging)
      ]}
    >
      <div css={titleStyle}>
        <div css={handleStyle} ref={dragRef}>
          <BsArrowsMove />
        </div>
        {title}
      </div>

      {content}
    </div>
  );
};

export const StoryCardPreview: React.FC<IStory> = props => (
  <div css={storyDndPreview}>
    <StoryCard {...props} />
  </div>
);

export default StoryCard;

import React from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import { StoryCardPreview } from "./StoryCard";
import { snapToGrid } from "./snapToGrid";

const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  physicalXY: [number, number],
  isSnapToGrid: boolean
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }

  let { x, y } = currentOffset;

  if (isSnapToGrid) {
    // Remove the initial offset from our calculations
    x -= initialOffset.x;
    y -= initialOffset.y;
    // Run calculations
    [x, y] = snapToGrid([x, y]);
    // Add the initialOffset that we removed
    x += initialOffset.x;
    y += initialOffset.y;
  }

  return {
    transform: `translate(${x - physicalXY[0]}px, ${y - physicalXY[1]}px)`
  };
}

export interface CustomDragLayerProps {
  snapToGrid: boolean;
}

const CustomDragLayer: React.FC<CustomDragLayerProps> = ({ snapToGrid }) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  function renderItem() {
    switch (itemType) {
      case "CARD":
        return <StoryCardPreview {...item} />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(
          initialOffset,
          currentOffset,
          item.physicalXY,
          snapToGrid
        )}
      >
        {renderItem()}
      </div>
    </div>
  );
};

export default CustomDragLayer;

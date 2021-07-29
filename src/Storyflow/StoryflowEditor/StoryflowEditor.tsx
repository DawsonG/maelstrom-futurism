import React, { Fragment, useState, useCallback } from "react";
import update from "immutability-helper";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { isFunction } from "../../utils/typeof";

import StoryCard from "./StoryCard";
import CustomDragLayer from "./CustomDragLayer";
import SvgLayer from "./SvgLayer";
import { masterContainer } from "./StoryflowEditor.styles";
import { IStoryMap, IStoryflow, IConnection } from "../Storyflow.interfaces";

interface IStoryflowEditor {
  onChange?: (stories: IStoryflow) => void;
  storyflow: IStoryflow;
}

const StoryflowEditor: React.FC<IStoryflowEditor> = ({
  storyflow,
  onChange,
}) => {
  const { stories, connections } = storyflow;

  // const svgRef = useRef<SVGSVGElement>(null);
  const [storyCards, setStoryCards] = useState<IStoryMap>(stories);
  const [conns] = useState<Array<IConnection>>(connections);

  const emitChange = (storyFlow: IStoryflow) => {
    if (onChange && isFunction(onChange)) {
      onChange(storyFlow);
    }
  };

  const moveBox = useCallback(
    (id: string, physicalXY: [number, number]) => {
      const tBoxes = update(storyCards, {
        [id]: {
          physicalXY: {
            $set: physicalXY,
          },
        },
      });

      setStoryCards(tBoxes);
      emitChange({ stories: { ...tBoxes }, connections: conns });
    },
    [stories]
  );

  const [, dropRef] = useDrop({
    accept: "CARD",
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };

      let x = Math.round(item.physicalXY[0] + delta.x);
      let y = Math.round(item.physicalXY[1] + delta.y);

      moveBox(item.id, [x, y]);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  /*
  useEffect(() => {
    Object.keys(stories).map((key: string) => {
      const story = {...stories[key]}; // Copy to enforce immutability
      
      
      
      if (story.connections) {
        Object.keys(story.connections).forEach(target => {
          const div1: HTMLDivElement = document.getElementById(story.id) as HTMLDivElement;
          const div2: HTMLDivElement = document.getElementById(target) as HTMLDivElement;
          
          const x1 = div1.offsetLeft + (div1.offsetWidth / 2);
          const y1 = div1.offsetTop + (div1.offsetHeight / 2);
          const x2 = div2.offsetLeft + (div2.offsetWidth / 2);
          const y2 = div2.offsetTop + (div2.offsetHeight / 2);
  
          const line: SVGLineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line') as unknown as SVGLineElement;
          line.setAttribute('stroke-width', '2');
          line.setAttribute('stroke', '#ff0000');
          line.setAttribute('x1', x1.toString());
          line.setAttribute('y1', y1.toString());
          line.setAttribute('x2', x2.toString())
          line.setAttribute('y2', y2.toString());
          
          svgRef?.current?.append(line);
          
        });
      }
    })
  });*/

  console.log("render", stories);

  return (
    <Fragment>
      <div ref={dropRef} css={masterContainer}>
        {Object.keys(storyCards).map((key) => (
          <StoryCard key={key} {...storyCards[key]} />
        ))}
        <SvgLayer connections={connections} />
      </div>

      <CustomDragLayer snapToGrid={false} />
    </Fragment>
  );
};

const StoryflowWrapper: React.FC<IStoryflowEditor> = (props: any) => (
  <DndProvider backend={HTML5Backend}>
    <StoryflowEditor {...props} />
  </DndProvider>
);

export default StoryflowWrapper;

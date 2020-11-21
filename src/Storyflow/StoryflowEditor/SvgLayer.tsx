import React from "react";
import { IConnection } from "../Storyflow.interfaces";
import { svgContainer } from "./StoryflowEditor.styles";

interface ISvgLayer {
  connections?: Array<IConnection>;
}

const SvgLayer: React.FC<ISvgLayer> = ({ connections }) => {
  console.log(connections);

  return <svg xmlns="http://www.w3.org/2000/svg" css={svgContainer}></svg>;
};

export default SvgLayer;

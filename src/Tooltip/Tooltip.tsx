import React, { ReactNode, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import { styledTooltip } from "./Tooltip.styles";

interface IPos {
  top: number;
  left: number;
  show: boolean;
}

interface ITooltip {
  children?: ReactNode;
  pos?: IPos;
}

const Tooltip: React.FC<ITooltip> = ({ children, pos }) => {
  const [innerPos, setPos] = useState(pos);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const current = ref.current;
    if (current && pos) {
      setPos({
        top: pos.top,
        left: pos.left - current.offsetWidth / 2,
        show: true,
      });
    }
  }, [ref]);

  if (!innerPos) {
    return null;
  }

  return (
    <div
      css={styledTooltip(innerPos.left, innerPos.top, innerPos.show)}
      ref={ref}
    >
      {children}
    </div>
  );
};

const useTooltip = (message: string) => {
  const ref = useRef<HTMLElement>(null);
  const shift = 4;
  let container: HTMLDivElement | null = null;

  const hoverHandler = (current: HTMLElement, flag: boolean) => {
    if (flag) {
      container = document.createElement("div");
      document.body.append(container);
      const { top, left } = current.getBoundingClientRect();
      const pos = {
        top: top + current.offsetHeight + shift,
        left: left + current.offsetWidth / 2,
      };
      ReactDOM.render(<Tooltip {...pos}>{message}</Tooltip>, container);
    } else {
      if (container) {
        container.remove();
      }
    }
  };

  useEffect(() => {
    const current = ref.current;
    if (current) {
      current.addEventListener("mouseover", () => hoverHandler(current, true));
      current.addEventListener("mouseout", () => hoverHandler(current, false));
    }
    return () => {
      if (container) {
        container.remove();
      }
    };
  }, []);

  return ref;
};

export default useTooltip;
/*
// ---------------

// Using

const Component = styled.div`
  display: inline-block;
  border: 1px solid gray;
  padding: 16px;
  margin: 8px;
  cursor: pointer;
`;

const App = () => {
  const ref = useTooltip('tooltip 1', {});
  return (
    <div>
      <Component ref={ref}>Test content</Component>
      <Component ref={useTooltip('tooltip 2')}>Test content</Component>
      <button ref={useTooltip('tooltip 3')}>Test content</button>
      <input ref={useTooltip('tooltip 4')}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
*/

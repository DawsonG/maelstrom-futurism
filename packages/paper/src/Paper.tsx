import { ReactNode } from "react";
import { useTheme } from "@maelstrom-futurism/core";

import * as styles from './styles.module.scss';

export enum StackType {
  SINGLE = "single",
  STACK = "stack",
  RANDOM_STACK = "random_stack",
  NONE = "none",
}
type Variant = "single" | "stack" | "random_stack" | "none" | StackType;

export enum HDirection {
  RIGHT = "right",
  CENTER = "center",
  LEFT = "left",
}

export enum VDirection {
  TOP = "top",
  BOTTOM = "bottom",
}

export enum Background {
  NONE = "none",
  GRAPH = "graph",
  DOT = "dot"
}
type BackgroundOptions = "none" | "graph" | "dot" | Background;

interface PaperProps {
  children: ReactNode;
  variant?: Variant;
  direction?: VDirection;
  background?: BackgroundOptions;
  width?: string;
  centered?: boolean;
  pre?: boolean;
  font?: string;
}

export default function Paper({
  children,
  variant,
  background,
  direction,
  width,
  centered,
  pre,
  font,
}: PaperProps) {
  const theme = useTheme();
  // outerStyles
  let outerStyles = [
    styles.paper
  ];
  if (centered) {
    outerStyles.push(styles.centered);
  }

  if (variant) {
    switch(variant) {
      case StackType.NONE:
        outerStyles.push(styles.stackTypeNone);
        break;
      case StackType.SINGLE:
        outerStyles.push(styles.stackTypeSingle);
        break;
      case StackType.RANDOM_STACK:
        outerStyles.push(styles.stackTypeRandom);
        break;
      case StackType.STACK:
        if (direction === VDirection.TOP) {
          outerStyles.push(styles.stackTypeTop)
        } else {
          outerStyles.push(styles.stackTypeBottom)
        }
        break;
    }
  }

  // Build inner styles
  let innerStyles = [];
  if (background) {
    switch (background) {
      case "dot":
      case Background.DOT:
        innerStyles.push(styles.backgroundDotted);
        break;
      case Background.GRAPH:
        innerStyles.push(styles.backgroundGraph);
        break;
    }
  }

  if (pre) {
    innerStyles.push(styles.pre);
  }

  let fontFamily = '';
  if (font) {
    fontFamily = font;
  }

  return (
    <div className={outerStyles.join(' ')} style={{ width }}>
      <div className={innerStyles.join(' ')} style={{ fontFamily }}>
        {children}
      </div>
    </div>
  );
}

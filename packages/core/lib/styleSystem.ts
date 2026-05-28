import { StyleOverride } from './utils/composeStyles';

export interface BaseStyles {
  border?: string;
  /** Style override prop — accepts Emotion `SerializedStyles` (composed with
   *  the component's base class) or plain `CSSProperties` (applied inline). */
  styles?: StyleOverride;
  bg?: string;
  background?: string;
  p?: string;
  padding?: string;
  m?: string;
  margin?: string;
  w?: string;
  width?: string;
  h?: string;
  height?: string;
}

const keyMap: Record<'bg' | 'w' | 'h' | 'm' | 'p', keyof BaseStyles> = {
  bg: 'background',
  w: 'width',
  h: 'height',
  m: 'margin',
  p: 'padding',
};

export const constructStyles = (styles: BaseStyles) => {
  const boxStyle = {} as Partial<BaseStyles>;

  // TODO: Edit this style component so that it can take compound keys
  // for instance bgColor -> backgroundColor.
  // TODO: fix this to warn on duplicate keys, for instance if `bg` and `background`
  // both exist
  for (const [key, value] of Object.entries(styles) as [keyof BaseStyles, BaseStyles[keyof BaseStyles]][]) {
    const mappedKey = (key in keyMap ? keyMap[key as keyof typeof keyMap] : key) as keyof BaseStyles;
    boxStyle[mappedKey] = value as never;
  }

  return boxStyle;
};

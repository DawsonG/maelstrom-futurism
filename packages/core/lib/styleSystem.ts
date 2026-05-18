import { SerializedStyles } from '@emotion/react';
// import { RequireOneOrNone } from 'type-fest';
// The world (well mostly this project) just isn't ready for the crazy
// type weirdness I'm trying to implement here.
/*
type backgroundKeys = RequireOneOrNone<{
    bg: string;
    background: string;
}, "bg" | "background">;

type widthKeys = RequireOneOrNone<{
    w: string;
    width: string;
}, "w" | "width">;

type heightKeys = RequireOneOrNone<{
    h: string;
    height: string;
}, "h" | "height">;

type marginKeys = RequireOneOrNone<{
    m: string;
    margin: string;
}, "m" | "margin">;

export type BaseStyles = {
    border?: string;
    css?: SerializedStyles | SerializedStyles[];
} & backgroundKeys
  & widthKeys
  & heightKeys
  & marginKeys;
*/

export interface BaseStyles {
  border?: string;
  css?: SerializedStyles | SerializedStyles[];
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

import { CSSProperties } from 'react';
import { css, SerializedStyles } from '@emotion/react';

/** Accepted value for a component's `styles` override prop.
 *  Pass a plain `CSSProperties` object for a quick inline override, or
 *  an Emotion `SerializedStyles` / array thereof to compose with the
 *  component's base Emotion class. */
export type StyleOverride = CSSProperties | SerializedStyles | SerializedStyles[];

export const isSerializedStyles = (
  value: unknown
): value is SerializedStyles | SerializedStyles[] => {
  if (Array.isArray(value)) {
    return value.length === 0 || isSerializedStylesObject(value[0]);
  }
  return isSerializedStylesObject(value);
};

const isSerializedStylesObject = (value: unknown): value is SerializedStyles =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as SerializedStyles).name === 'string' &&
  typeof (value as SerializedStyles).styles === 'string';

export const composeStyles = (
  base: SerializedStyles,
  overrides?: SerializedStyles | SerializedStyles[]
): SerializedStyles => {
  if (!overrides) return base;
  const arr = Array.isArray(overrides) ? overrides : [overrides];
  return arr.reduce((acc, style) => css`${acc}${style}`, base);
};

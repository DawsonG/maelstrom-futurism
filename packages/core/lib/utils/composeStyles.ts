import { css } from "@emotion/react";
import { SerializedStyles } from "@emotion/utils";

export const composeStyles = (originalStyle: SerializedStyles, cssOverrides?: SerializedStyles | SerializedStyles[]) => {
    const cssArr = cssOverrides ? (Array.isArray(cssOverrides) ? cssOverrides : [cssOverrides]) : [];
    const composed = cssArr.length > 0
        ? cssArr.reduce((acc, style) => css`${acc}${style}`, originalStyle)
        : originalStyle;
    
    return composed;
}
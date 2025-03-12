import { css } from '@emotion/react';
import { Theme } from '@maelstrom-futurism/core';
import { lighten } from 'polished';

export const normalStyledInput = (theme: Theme) => css`
    border: solid 1px ${theme.color("content")};
    border-radius: ${theme.inputRadius()};
    padding: 0.5em 1em;
    width: 100%;
    font-size: 1em;
    color: ${theme.color("textColor")};
    background-color: ${theme.color("content")};

    ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: ${theme.color("secondary")};
    }
    ::-moz-placeholder {
        /* Firefox 19+ */
        color: ${theme.color("secondary")};
    }
    :-ms-input-placeholder {
        /* IE 10+ */
        color: ${theme.color("secondary")};
    }
    :-moz-placeholder {
        /* Firefox 18- */
        color: ${theme.color("secondary")};
    }

    :focus {
        outline: none !important;
        border: solid 1px ${lighten(0.1, theme.color("secondary"))};
    }
`;
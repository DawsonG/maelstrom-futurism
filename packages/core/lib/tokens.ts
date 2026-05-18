export const SIZES = {
    base:   '16px',
    sm:     '0.707em',
    normal: '1em',
    md:     '1.414em',
    lg:     '2em',
    xl:     '2.827em',
    xxl:    '4em',
} as const;

export const SPACES = ['0', '4', '8', '16', '24', '32', '40', '48', '64'] as const;

export const BREAKPOINTS = {
    xs: '0px',
    sm: '576px',
    md: '992px',
    lg: '1200px',
} as const;

export const HEIGHTS = {
    bottom: '-1000',
    low:    '-100',
    sunk:   '-10',
    normal: '0',
    raised: '10',
    high:   '100',
    top:    '1000',
} as const;

export const RADII = {
    input:  '8px',
    button: '16px',
    card:   '24px',
    pill:   '9999px',
} as const;

export const LINE_HEIGHTS = {
    tight:   '1.2',
    normal:  '1.5',
    relaxed: '1.6',
} as const;

export const LETTER_SPACINGS = {
    tight:   '-0.01em',
    normal:  '0',
    wide:    '0.04em',
    display: '0.06em',
} as const;

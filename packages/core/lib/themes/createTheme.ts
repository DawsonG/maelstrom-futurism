import { ColorSet } from '../interfaces';
import { SIZES } from '../tokens';
import Theme from './theme';

export type ColorSetName = 'nordDark' | 'nordLight';

export interface ThemeOverrides {
    colors?: Partial<ColorSet>;
    radii?: {
        input?: string;
        button?: string;
        card?: string;
        pill?: string;
    };
    sizes?: {
        base?: string;
        sm?: string;
        normal?: string;
        md?: string;
        lg?: string;
        xl?: string;
        xxl?: string;
    };
    durations?: {
        fast?: string;
        normal?: string;
        slow?: string;
        ripple?: string;
    };
    lineHeights?: {
        tight?: string;
        normal?: string;
        relaxed?: string;
    };
    letterSpacings?: {
        tight?: string;
        normal?: string;
        wide?: string;
        display?: string;
    };
}

/*
PolarNight  #2e3440  #3b4252  #434c5e  #4c566a
SnowStorm   #d8dee9  #e5e9f0  #eceff4
Frost       #8fbcbb  #88c0d0  #81a1c1  #5e81ac
Aurora      #bf616a  #d08770  #ebcb8b  #a3be8c  #b48ead
*/

const nordDarkColors: ColorSet = {
    background: '#242933',
    borderMuted: '#303744',
    border: '#2e3440',
    content: '#2e3440',
    textColor: '#eceff4',
    linkColor: '#88c0d0',
    primary: '#5e81ac',
    secondary: '#81a1c1',
    focus: '#5e81ac',
    active: '#5e81ac',
    alert: '#bf616a',
    warning: '#ebcb8b',
    success: '#a3be8c',
    info: '#5e81ac',
};

const nordLightColors: ColorSet = {
    background: '#eceff4',
    borderMuted: '#303744',
    border: '#2e3440',
    content: '#eceff4',
    textColor: '#242933',
    linkColor: '#88c0d0',
    primary: '#5e81ac',
    secondary: '#81a1c1',
    focus: '#5e81ac',
    active: '#5e81ac',
    alert: '#bf616a',
    warning: '#ebcb8b',
    success: '#a3be8c',
    info: '#5e81ac',
};

const NameToColorSetMap: Record<ColorSetName, ColorSet> = {
    nordDark: nordDarkColors,
    nordLight: nordLightColors,
};

export const createTheme = (colorSetName: ColorSetName, overrides?: ThemeOverrides): Theme => {
    const colorSet: ColorSet = overrides?.colors
        ? { ...NameToColorSetMap[colorSetName], ...overrides.colors }
        : NameToColorSetMap[colorSetName];

    const theme = new Theme({ colorSet });

    if (overrides?.radii) {
        const { input, button, card, pill } = overrides.radii;
        if (input  !== undefined) theme.inputRadius  = input;
        if (button !== undefined) theme.buttonRadius = button;
        if (card   !== undefined) theme.borderRadius = card;
        if (pill   !== undefined) theme.pillRadius   = pill;
    }

    if (overrides?.sizes) {
        theme.sizes = { ...SIZES, ...overrides.sizes };
    }

    if (overrides?.durations) {
        theme.durations = { ...theme.durations, ...overrides.durations };
    }

    if (overrides?.lineHeights) {
        theme.lineHeights = { ...theme.lineHeights, ...overrides.lineHeights };
    }

    if (overrides?.letterSpacings) {
        theme.letterSpacings = { ...theme.letterSpacings, ...overrides.letterSpacings };
    }

    return theme;
};
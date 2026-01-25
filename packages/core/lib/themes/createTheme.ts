import { ColorSet } from '../interfaces';
import Theme from './theme';

// This file should take a function that copies the default theme
// and overwrites any parameter that was set in the passed parameters

// Ideally, creating a theme could be done with a limited number of variables
// like roundedness, shadow intensity, padding, and accent/base colors.
// Animations may also be a good candidate for creating these.
export type ColorSetName = 'nordDark' | 'nordLight';

/*
PolarNight
#2e3440
#3b4252
#434c5e
#4c566a

SnowStorm
#d8dee9
#e5e9f0
#eceff4

Frost
#8fbcbb
#88c0d0
#81a1c1
#5e81ac

Aurora
#bf616a
#d08770
#ebcb8b
#a3be8c
#b48ead
*/

const nordDarkColors = {
    background: '#242933',
    borderMuted: '#303744',
    border: '#2e3440',
    content: '#2e3440',
    textColor: '#eceff4',
    linkColor: '#88c0d0',
    primary: '#5e81ac',
    secondary: '#81a1c1',
    alert: '#bf616a',
    warning: '#ebcb8b',
    success: '#a3be8c',
    info: '#5e81ac'
};

const nordLightColors = {
    background: '#eceff4',
    borderMuted: '#303744',
    border: '#2e3440',
    content: '#eceff4',
    textColor: '#242933',
    linkColor: '#88c0d0',
    primary: '#5e81ac',
    secondary: '#81a1c1',
    alert: '#bf616a',
    warning: '#ebcb8b',
    success: '#a3be8c',
    info: '#5e81ac'
};

const NameToColorSetMap: Record<ColorSetName, ColorSet> = {
    nordDark: nordDarkColors,
    nordLight: nordLightColors,
};

export const createTheme = (colorSetName: ColorSetName) => 
    new Theme({ colorSet: NameToColorSetMap[colorSetName] });
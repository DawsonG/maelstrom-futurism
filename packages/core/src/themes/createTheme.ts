import { Intensity, Direction } from '@maelstrom-futurism/core';

// This file should take a function that copies the default theme
// and overwrites any parameter that was set in the passed parameters

// Ideally, creating a theme could be done with a limited number of variables
// like roundedness, shadow intensity, padding, and accent/base colors.
// Animations may also be a good candidate for creating these.



export interface ThemeInterface {
    roundednessIntensity?: Intensity;
    shadowIntensity?: Intensity;
    shadowDirection?: Direction;
}

export const createTheme = (props: ThemeInterface) => {

};
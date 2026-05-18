import { CardinalDirection, Intensity } from "./enums";

export interface ColorSet {
    background: string;
    borderMuted: string;
    border: string;
    content: string;
    textColor: string;
    linkColor: string;
    primary: string;
    secondary: string;
    focus: string;
    active: string;
    alert: string;
    warning: string;
    success: string;
    info: string;
}

export interface ThemeInterface {
    colorSet: ColorSet;
    roundednessIntensity?: Intensity;
    shadowIntensity?: Intensity;
    shadowDirection?: CardinalDirection;
}
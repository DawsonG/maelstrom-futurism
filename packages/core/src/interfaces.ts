export enum Intensity {
    LOW,
    MEDIUM,
    HIGH,
}

export enum Direction {
    COLUMN,
    ROW,
}

export enum CardinalDirection {
    NORTH,
    NORTHEAST,
    EAST,
    SOUTHEAST,
    SOUTH,
    SOUTHWEST,
    WEST,
    NORTHWEST,
}

export interface ColorSet {
    background: string;
    content: string;
    textColor: string;
    primary: string;
    secondary: string;
    alert: string;
    warning: string;
    success: string;
    info: string;
}

export interface ThemeInterface {
    colorSet?: ColorSet;
    roundednessIntensity?: Intensity;
    shadowIntensity?: Intensity;
    shadowDirection?: Direction;
}

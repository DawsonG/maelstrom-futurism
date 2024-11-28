export enum Intensity {
    LOW,
    MEDIUM,
    HIGH,
}

export enum JustifyContent {
    START = 'start',
    CENTER = 'center',
    END = 'end',
    SPACE_BETWEEN = 'space-between',
    SPACE_AROUND = 'space-around',
    SPACE_EVENLY = 'space-evenly',
}

export enum Direction {
    COLUMN = 'column',
    ROW = 'row',
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

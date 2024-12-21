// Zero dependencies? Hell yeah!

/**
 * RgbaColor is the real storage type used by MfColor. Manipulations and formatting
 * are done against RgbaColor and simply returned in the format requested by the user.
 */
export type RgbaColor = {
    r: number;
    g: number;
    b: number;
    a?: number;
};

/**
 * HslColor is used for certain kinds of color manipulation.
 */
export type HslColor = {
    h: number;
    s: number;
    l: number;
    a?: number;
};

const TRIM_LEFT = /^[\s#]+/; // Remove spaces and '#' from start of figure
const TRIM_RIGHT = /\s+$/;
const RGB_NUMBER_MATCH = /rgba?[\( ]?(?<r>[01]?\d\d?|2[0-4]\d|25[0-5])\W+(?<g>[01]?\d\d?|2[0-4]\d|25[0-5])\W+(?<b>[01]?\d\d?|2[0-4]\d|25[0-5])\)?$/g;
const RGBA_NUMBER_MATCH = /rgba?[\( ]?(?<r>[01]?\d\d?|2[0-4]\d|25[0-5])\W+(?<g>[01]?\d\d?|2[0-4]\d|25[0-5])\W+(?<b>[01]?\d\d?|2[0-4]\d|25[0-5])\W+(?<a>0?\.\d+|[0-1])\)?$/g;

// Single line utility functions
const isString = (testValue: any): boolean => Object.prototype.toString.call(testValue) === "[object String]";
const testInRange = (num: number, min: number, max: number) => num >= min && num <= max;

export default class MfColor {
    private _color: RgbaColor;
    private readonly _originalColor: RgbaColor;

    constructor(colorStr: string | RgbaColor) {
        if (isString(colorStr)) {
            let hexColor = '';
            const color = MfColor.normalizeHex(colorStr as string);

            if (this.colorNameMap[color]) {
                hexColor = this.colorNameMap[color];
            } else if (MfColor.isValidHex(`#${color}`)) {
                hexColor = color;
            } else if (this.isRgb(color)) {
                const colorFromRgb = new RegExp(RGB_NUMBER_MATCH).exec(color)?.groups!;

                this._color = {
                    r: parseInt(colorFromRgb.r),
                    g: parseInt(colorFromRgb.g),
                    b: parseInt(colorFromRgb.b),
                };

                this._originalColor = { ...this._color };
                return
            } else if (this.isRgba(color)) {
                const colorFromRgb = new RegExp(RGBA_NUMBER_MATCH).exec(color)?.groups!;

                this._color = {
                    r: parseInt(colorFromRgb.r),
                    g: parseInt(colorFromRgb.g),
                    b: parseInt(colorFromRgb.b),
                    a: parseFloat(colorFromRgb.a)
                };
                this._originalColor = { ...this._color };
                return;
            } else {
                throw new Error(`Invalid parameter passed to create MfColor. "${colorStr}" is not a color`);
            }

            this._color = MfColor.hexToRgbaColor(hexColor);
        } else {
            this._color = colorStr as RgbaColor;
        }
        
        this._originalColor = { ...this._color }; // copy the color this was created with
    }

    public toHex(): string {
        const { r, g, b, a } = this._color;

        return `#${MfColor.decimalToHex(r)}${MfColor.decimalToHex(g)}${MfColor.decimalToHex(b)}${a !== undefined ? MfColor.decimalToHex(a * 255) : ''}`;
    }

    public toRgba(): string {
        const { r, g, b, a } = this._color;
        if (a !== undefined) {
            // To avoid losses on multiple conversions alpha values
            // are stored as 0 - 255 values.  The rgba function requires
            // 0 - 1 so we need to use our converter.
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        return `rgb(${r}, ${g}, ${b})`;
    }

    public toColor(): RgbaColor {
        return this._color;
    }

    public toName(): string | undefined {
        // remove pound and alpha values
        let hex = this.toHex().toLowerCase().substring(1, 7);

        for (const [key, value] of Object.entries(this.colorNameMap)) {
            if (value.toLowerCase() === hex) {
                return key;
            }
        }

        // It's possible that a hex value doesn't have a name.
        return undefined;
    }

    public toHsla(): HslColor {
        const r = this._color.r / 255;
        const g = this._color.g / 255;
        const b = this._color.b / 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const delta = max - min;

        let h = (max + min) / 2;
        let s = h;
        let l = h;

        if (delta === 0) {
            // Achromatic
            return { h: 0, s: 0, l };
        }
        
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
            case r:
                h = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }
        
        
        return { h, s, l };
    }

    /**
     * Retrieve the color that was set when MfColor was created, before any manipulations.
     * 
     * @returns the original color that MfColor object was created with
     */
    public getOriginalColor(): MfColor {
        return new MfColor(this._originalColor);
    }

    /**
     * The perceived brightness of a given color as modeled by w3
     * https://www.w3.org/TR/AERT/#color-contrast.  These are approximations
     * that miss a lot of nuance (see https://stackoverflow.com/a/56678483)
     * but they are appropriate for our uses (calculating contrast for instance).
     * 
     * @returns perceived brightness
     */
    public getBrightness(): number {
        const { r, g, b } = this._color;
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    /**
     * Darken the base MfColor
     * 
     * @param amount value between 0 and 1 
     */
    public darken(percent: number) {
        if (percent > 1 || percent < 0) {
            throw new Error(`${percent} is not a value between 0 and 1`);
        }
        this.lightenDarken(-percent);
    }

    /**
     * Lighten the base MfColor
     * 
     * @param amount value between 0 and 1 
     */
    public lighten(percent: number) {
        if (percent > 1 || percent < 0) {
            throw new Error(`${percent} is not a value between 0 and 1`);
        }
        this.lightenDarken(percent);
    }

    /**
     * Reverts ALL changes made to a given MfColor
     */
    public revert() {
        this._color = { ...this._originalColor };
    }

    /* ---------------------------------------
     * PRIVATE METHODS
     * --------------------------------------- */

    /**
     * Checks to see if a passed value is formatted as an rgb string.
     * 
     * Valid: rgb(250, 50, 50); rgb(50, 50, 50); rgb 40 139 10; 56 99 59
     * Invalid: rgba(250, 250, 250, 50), #ff0000
     * 
     * @param value any string
     * @returns whether or not a given string is an rgb string
     */
    private isRgb(value: string): boolean {
        const colorGroups = new RegExp(RGB_NUMBER_MATCH).exec(value)?.groups;

        if (!colorGroups || Object.keys(colorGroups).length !== 3) return false;
        ['r', 'g', 'b'].forEach(key => colorGroups[key] && testInRange(parseInt(colorGroups[key]), 0, 255));
        if (colorGroups.a !== undefined) return false; // this should fail this but pass isRgba
        return true;
    }

    /**
     * Checks to see if a passed value is formatted as an rgb string.
     * 
     * Valid: rgba(250, 50, 50, 10); rgb(50, 50, 50, 10)
     * Invalid: rgb(250, 250, 250), #ff0000
     * 
     * @param value any string
     * @returns whether or not a given string is an rgba string
     */
    private isRgba(value: string): boolean {
        const colorGroups = new RegExp(RGBA_NUMBER_MATCH).exec(value)?.groups;

        if (!colorGroups || Object.keys(colorGroups).length !== 4) return false;
        ['r', 'g', 'b'].forEach(key => colorGroups[key] && testInRange(parseInt(colorGroups[key]), 0, 255));
        return testInRange(parseFloat(colorGroups.a), 0, 1);
    }

    /** 
     * Takes user input and removed # or spaces and converts to lowercase.
     * 
     * @param value a presumed hex color value
     * @returns a hex code without # or spaces
     */
    private static normalizeHex(value: string): string {
        let hex = value
            .replace(TRIM_LEFT, '')
            .replace(TRIM_RIGHT, '')
            .toLowerCase();
        if (hex.length === 3 && /[0-9a-f]{3}/.test(hex)) {
            hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
        }

        return hex;
    }

    /**
     * Lighten or darken a given color. Used through the public lighten or darken
     * functions.
     * 
     * @param percentage a number between -1 and 1 to darken (-) or lighten (+)
     */
    private lightenDarken(percentage: number) {
        let { r, g, b, a } = this._color;

        // const amount = Math.floor(255 * percentage);
        r += Math.round(r * percentage);
        g += Math.round(g * percentage);
        b += Math.round(b * percentage);
        
        r = Math.max(Math.min(255, r), 0);
        g = Math.max(Math.min(255, g), 0);
        b = Math.max(Math.min(255, b), 0);

        this._color = { r, g, b, a };
    }

    /* ---------------------------------------
     * STATIC METHODS
     * --------------------------------------- */

    /**
     * Turns any decimal number into a two (or more) digit hexadecimal number
     * 
     * @param num any decimal number
     * @returns a decimal string with 2 or more digits
     */
    static decimalToHex =  (num: number): string => 
        Math.round(num).toString(16).padStart(2, '0');

    /**
     * Converts a valid hexadecimal string color identifier with or without
     * a # into a RgbaColor object.
     * 
     * @param color a hexadecimal color identifier
     * @returns a RgbaColor { r, g, b, a? } object
     */
    static hexToRgbaColor = (color: string): RgbaColor => {
        let trimmedColor = MfColor.normalizeHex(color);
        const rgb = [
            trimmedColor.substring(0, 2),
            trimmedColor.substring(2, 4),
            trimmedColor.substring(4, 6),
        ];

        const colorObj: RgbaColor = {
            r: parseInt(rgb[0], 16),
            g: parseInt(rgb[1], 16),
            b: parseInt(rgb[2], 16),
        };

        if (trimmedColor.length > 7) {
            colorObj.a = parseFloat((parseInt(trimmedColor.substring(6, 8), 16) / 255).toFixed(4));
        }

        return colorObj;
    }

    /**
     * Checks to see if a given string is a valid hex color.
     * 
     * Valid: #ff0000, #e0e0e0ff
     * Invalid: ff0000
     * 
     * @param hex a string 
     * @returns whether or not a string is a hex color
     */
    static isValidHex = (hex: string): boolean => 
        /^#(([0-9A-Fa-f]{2}){3,4}|[0-9A-Fa-f]{3})$/.test(hex);

    /**
     * Big List of Colors from w3
     * https://www.w3.org/TR/css-color-4/#named-colors
     */
    private colorNameMap: Record<string, string> = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        burntsienna: 'ea7e5d',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkgrey: 'a9a9a9',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkslategrey: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dimgrey: '696969',
        dodgerblue: '1e90ff',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        grey: '808080',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred: 'cd5c5c',
        indigo: '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgray: 'd3d3d3',
        lightgreen: '90ee90',
        lightgrey: 'd3d3d3',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslategray: '778899',
        lightslategrey: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370db',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'db7093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        rebeccapurple: '663399',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        slategrey: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    }
}

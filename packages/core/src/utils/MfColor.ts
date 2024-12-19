type TColor = {
    r: number;
    g: number;
    b: number;
    a?: number;
};

const trimLeft = /^[\s#]+/;
const trimRight = /\s+$/;

export default class MfColor {
    private _color: TColor;

    constructor(colorStr: string | TColor) {
        let hexColor = '';
        if (Object.prototype.toString.call(colorStr) === '[object String]') {
            const color = (colorStr as string)
                .replace(trimLeft, '')
                .replace(trimRight, '')
                .toLowerCase();

            if (this.colorNameMap[color]) {
                hexColor = this.colorNameMap[color];
            } else if (MfColor.isValidHex(`#${color}`)) {
                hexColor = color;
            } else if (this.isRgb(color) || this.isRgba(color)) {
                const colorFromRgb = [...color.matchAll(/\d{1,3}/g)];
                this._color = {
                    r: parseInt(colorFromRgb[0][0]),
                    g: parseInt(colorFromRgb[1][0]),
                    b: parseInt(colorFromRgb[2][0]),
                };
                return;
            } else {
                throw new Error(`Invalid parameter passed to create MfColor. ${color} is not a color`);
            }
        } else {
            this._color = colorStr as TColor;
            return;
        }

        this._color = MfColor.hexToTColor(hexColor);
    }

    public toHex(): string {
        const { r, g, b, a } = this._color;

        return `#${MfColor.decimalToHex(r)}${MfColor.decimalToHex(g)}${MfColor.decimalToHex(b)}${a !== undefined ? MfColor.decimalToHex(a) : ''}`;
    }

    public toRgba(): string {
        const { r, g, b, a } = this._color;
        if (a) {
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        return `rgb(${r}, ${g}, ${b})`;
    }

    public toColor(): TColor {
        return this._color;
    }

    public toName(): string | undefined {
        if (this.toHex().toLowerCase().length > 7) {
            // No rgba values have an alpha identifier
            return undefined;
        }

        for (const [key, value] of Object.entries(this.colorNameMap)) {
            if (value.toLowerCase() === this.toHex().toLowerCase().substring(1)) {
                return key;
            }
        }

        // It's possible that a hex value doesn't have a name.
        return undefined;
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

    /* ---------------------------------------
     * PRIVATE METHODS
     * --------------------------------------- */

    /**
     * Checks to see if a passed value is formatted as an rgb string.
     * 
     * Valid: rgb(250, 50, 50); rgb(50, 50, 50)
     * Invalid: rgba(250, 250, 250, 50), #ff0000
     * 
     * @param value any string
     * @returns whether or not a given string is an rgb string
     */
    private isRgb(value: string): boolean {
        return value.startsWith('rgb') && !value.startsWith('rgba');
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
        return value.startsWith('rgba');
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
    static decimalToHex =  (num: number): string => {
        const raw = num.toString(16);
        return raw.length == 1 ? `0${raw}` : raw;
    }

    /**
     * 
     * 
     * @param color a hexadecimal color identifier
     * @returns a TColor { r, g, b, a? } object
     */
    static hexToTColor = (color: string): TColor => {
        let trimmedColor = color
            .replace(trimLeft, '');

        const rgb = [
            trimmedColor.substring(0, 2),
            trimmedColor.substring(2, 4),
            trimmedColor.substring(4, 6),
        ];

        const colorObj: TColor = {
            r: parseInt(rgb[0], 16),
            g: parseInt(rgb[1], 16),
            b: parseInt(rgb[2], 16),
        };

        if (trimmedColor.length > 7) {
            colorObj.a = parseInt(trimmedColor.substring(6, 8), 16);
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
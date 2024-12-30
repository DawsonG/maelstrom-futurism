import { describe, expect, test } from 'vitest';

import MfColor from './MfColor';

describe('MfColor', () => {
    describe('constructor', () => {
        const testCases = [
            ['a plain color object (without alpha)', { r: 255, g: 255, b: 255 }, '#ffffff', 'rgb(255, 255, 255)', { r: 255, g: 255, b: 255 }, 'white'],
            ['color name', 'red', '#ff0000', 'rgb(255, 0, 0)', { r: 255, g: 0, b: 0 }, 'red'],
            ['an abbreviated hex number', '#faf', '#ffaaff', 'rgb(255, 170, 255)', { r: 255, g: 170, b: 255 }, undefined],
            ['an abbreviated, unformatted hex number', 'fff', '#ffffff', 'rgb(255, 255, 255)', { r: 255, g: 255, b: 255 }, 'white'],
            ['a hex color with full alpha', '#ffffffff', '#ffffffff', 'rgba(255, 255, 255, 1)', { r: 255, g: 255, b: 255, a: 1 }, 'white'],
            ['a hex color with no alpha', '#ffffff00', '#ffffff00', 'rgba(255, 255, 255, 0)', { r: 255, g: 255, b: 255, a: 0 }, 'white'],
            ['an unformatted hex color with alpha', 'ffffffaa', '#ffffffaa', 'rgba(255, 255, 255, 0.6667)', { r: 255, g: 255, b: 255, a: 0.6667 }, 'white'],
            ['a hex color with alpha', '#ffffffaa', '#ffffffaa', 'rgba(255, 255, 255, 0.6667)', { r: 255, g: 255, b: 255, a: 0.6667 }, 'white'],
            ['a hex string', '#ff0000', '#ff0000', 'rgb(255, 0, 0)', { r: 255, g: 0, b: 0 }, 'red'],
            ['an unformated hex string', 'ff0000', '#ff0000', 'rgb(255, 0, 0)', { r: 255, g: 0, b: 0 }, 'red'],
            ['an rgb string', 'rgb(200, 200, 200)', '#c8c8c8', 'rgb(200, 200, 200)', { r: 200, g: 200, b: 200 }, undefined],
            ['an rgb string without punctuation', 'rgb 255 0 0', '#ff0000', 'rgb(255, 0, 0)', { r: 255, g: 0, b: 0 }, 'red'],
            ['an rgb string with mixed punctuation', 'rgb 55,55,55', '#373737', 'rgb(55, 55, 55)', { r: 55, g: 55, b: 55 }, undefined],
            ['an unformatted rgba string with alpha', 'rgb 55 55 55 0.225', '#37373739', 'rgba(55, 55, 55, 0.225)', { r: 55, g: 55, b: 55, a: 0.225 }, undefined],
            ['an rgba string with alpha', 'rgba(200, 200, 200, 0.05)', '#c8c8c80d', 'rgba(200, 200, 200, 0.05)', { r: 200, g: 200, b: 200, a: 0.05 }, undefined],
        ];

        testCases.forEach(testCase => {
            test(`it creates an object from ${testCase[0]}`, () => {
                const color = new MfColor(testCase[1] as any);
                expect(color.toHex()).toEqual(testCase[2]);
                expect(color.toRgba()).toEqual(testCase[3]);
                expect(color.toColor()).toStrictEqual(testCase[4]);
                expect(color.toName()).toEqual(testCase[5]);
            });
        });

        test('it throws an exception if sent a non-existing color name', () => {
            expect(() => new MfColor('xXx_not_a_color_324'))
                .toThrow(new Error('Invalid parameter passed to create MfColor. "xXx_not_a_color_324" is not a color'));
        });

        test('it throws an exception if sent an invalid color "hex"', () => {
            expect(() => new MfColor('#fafzfa'))
                .toThrow(new Error('Invalid parameter passed to create MfColor. "#fafzfa" is not a color'));
        });

        test('it throws an exception if sent an invalid color "rgb"', () => {
            expect(() => new MfColor('rgb(394 255 100)'))
                .toThrow(new Error('Invalid parameter passed to create MfColor. "rgb(394 255 100)" is not a color'))
        });

        test('it throws an exception if sent an invalid color "rgba"', () => {
            expect(() => new MfColor('rgba(100 255 100 500)'))
                .toThrow(new Error('Invalid parameter passed to create MfColor. "rgba(100 255 100 500)" is not a color'))
        });
    });

    test('it returns a brightness value', () => {
        const color = new MfColor('#aaff00');
        expect(color.getBrightness()).toBe(200.515);
    });

    describe('manipulations', () => {
        describe('lightenDarken', () => {
            test('it lightens a color by a given amount', () => {
                const color = new MfColor('#ababab');
                color.lighten(0.4);
                // #ababab
                // #efefef
                expect(color.toHex()).toBe('#efefef');
            });

            test('it darkens a color by a given amount', () => {
                const color = new MfColor('#ababab');
                color.darken(0.4);
                // #ababab
                // #676767
                expect(color.toHex()).toBe('#676767');
            });

            test('it throws an error if passed an an out of range percentage', () => {
                const color = new MfColor('#ababab');
                expect(() => color.darken(4))
                    .toThrow(new Error('4 is not a value between 0 and 1'));
                expect(() => color.darken(-1))
                    .toThrow(new Error('-1 is not a value between 0 and 1'));
                expect(() => color.lighten(5))
                    .toThrow(new Error('5 is not a value between 0 and 1'));
                    expect(() => color.lighten(-1))
                    .toThrow(new Error('-1 is not a value between 0 and 1'));
            });
        });

        test('it returns the initial color after manipulations', () => {
            const color = new MfColor('#ababab');
            color.darken(0.4);
            expect(color.toHex()).toBe('#676767');
            expect(color.getOriginalColor().toHex()).toBe('#ababab');
        });

        test('it reverts to the initial color after manipulations', () => {
            const color = new MfColor('#ababab');
            color.darken(0.4);
            expect(color.toHex()).toBe('#676767');
            color.revert();
            expect(color.toHex()).toBe('#ababab');
        });
    });

    describe('statics', () => {
        test('it returns the right valid hex boolean', () => {
            const validValues = ['#000', '#fff', '#ffffff', '#ffffffff'];
            validValues.forEach(value => {
                expect(MfColor.isValidHex(value)).toBe(true);
            });

            const invalidValues = ['000', '#ZZZ', '#ff', '#ffff', '#fffffffff', '#f0f0f0zz'];
            invalidValues.forEach(value => {
                expect(MfColor.isValidHex(value)).toBe(false);
            });
        });
/*
        describe('formatStringAsHexColor', () => {
            test('it formats colors correctly', () => {
                const testScenarios = ['#000', 'fff', 'ffffff', 'ffffffff'];
                expect(formatStringAsHexColor('#000')).toEqual('#000');
            });
    
            test('it throws an error for invalid colors', () => {
    
            });
        });
*/
    });
});
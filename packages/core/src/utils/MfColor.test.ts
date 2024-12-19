import { describe, expect, test } from 'vitest';

import MfColor from './MfColor';

describe('MfColor', () => {
    describe('constructor', () => {
        /*
            red ✓
            #fff
            fff
          #ff0000 ✓
            ff0000 ✓
            ffffffaa ✓
          #ffffffaa ✓
            rgb(200, 200, 200) ✓
            rgb(200, 200, 200) ✓
            rgba(200, 200, 200, 10) ✓
            rgb 255 0 0 ✓
            rgb 55 55 55 55 ✓
            rgb 55,55,55 ✓
        */
        const testCases = [
            ['a plain color object (without alpha)', { r: 255, g: 255, b: 255 }, '#ffffff', 'rgb(255, 255, 255)', { r: 255, g: 255, b: 255 }, 'white'],
            ['color name', 'red', '#ff0000', 'rgb(255, 0, 0)', { r: 255, g: 0, b: 0 }, 'red'],
        //  ['an abbreviated hex number', '#fff', '#ffffff', 'rgb(255, 255, 255)', { r: 255, g: 255, b: 255 }, 'white'],
        //  ['an abbreviated, unformatted hex number', 'fff', '#ffffff', 'rgb(255, 255, 255)', { r: 255, g: 255, b: 255 }, 'white'],
        //  ['an hex color with full alpha', '#ffffffff', '#ffffff', 'rgb(255, 255, 255)', { r: 255, g: 255, b: 255 }, 'white'],
            ['an unformatted hex color with alpha', 'ffffffaa', '#ffffffaa', 'rgba(255, 255, 255, 170)', { r: 255, g: 255, b: 255, a: 170 }, undefined],
            ['a hex color with alpha', '#ffffffaa', '#ffffffaa', 'rgba(255, 255, 255, 170)', { r: 255, g: 255, b: 255, a: 170 }, undefined],
            ['a hex string', '#ff0000', '#ff0000', 'rgb(255, 0, 0)', { r: 255, g: 0, b: 0 }, 'red'],
            ['an unformated hex string', 'ff0000', '#ff0000', 'rgb(255, 0, 0)', { r: 255, g: 0, b: 0 }, 'red'],
            ['an rgb string', 'rgb(200, 200, 200)', '#c8c8c8', 'rgb(200, 200, 200)', { r: 200, g: 200, b: 200 }, undefined],
            ['an rgb string without punctuation', 'rgb 255 0 0', '#ff0000', 'rgb(255, 0, 0)', { r: 255, g: 0, b: 0 }, 'red'],
            ['an rgb string with mixed punctuation', 'rgb 55,55,55', '#373737', 'rgb(55, 55, 55)', { r: 55, g: 55, b: 55 }, undefined],
            ['an rgba string with alpha', 'rgb 55 55 55 55', '#37373737', 'rgba(55, 55, 55, 55)', { r: 55, g: 55, b: 55, a: 55 }, undefined],
            ['an rgba string with alpha', 'rgba(200, 200, 200, 10)', '#c8c8c80a', 'rgba(200, 200, 200, 10)', { r: 200, g: 200, b: 200, a: 10 }, undefined],
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
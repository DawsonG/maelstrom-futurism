import { describe, expect, test } from 'vitest';
import { formatStringAsHexColor, isValidHex } from './colors';

describe('Color Utils', () => {
    describe('isValidHex', () => {
        test('it returns the right valid hex boolean', () => {
            const validValues = ['#000', '#fff', '#ffffff', '#ffffffff'];
            validValues.forEach(value => {
                expect(isValidHex(value)).toBe(true);
            });

            const invalidValues = ['000', '#ZZZ', '#ff', '#ffff', '#fffffffff', '#f0f0f0zz'];
            invalidValues.forEach(value => {
                expect(isValidHex(value)).toBe(false);
            });
        });
    });

    describe('formatStringAsHexColor', () => {
        test('it formats colors correctly', () => {
            const testScenarios = ['#000', 'fff', 'ffffff', 'ffffffff'];
            expect(formatStringAsHexColor('#000')).toEqual('#000');
        });

        test('it throws an error for invalid colors', () => {

        });
    });
});
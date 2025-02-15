import { describe, expect, test } from 'vitest';
import obfuscate from './stringManipulation';

describe('stringManipulation > obfuscate', () => {
    test('it replaces strings with human-readable but machine nonsense strings', () => {
        expect(obfuscate('I need to sleep. It\'s very late.'))
            .toEqual('ӏ neeԁ to sleep. ӏt\'s very late.');
    });
});
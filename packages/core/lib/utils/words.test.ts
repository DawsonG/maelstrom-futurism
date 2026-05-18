import { describe, expect, it, test } from 'vitest';
import { capitalize, titleCase } from './words';

describe('words', () => {
  describe('capitalize', () => {
    // This test is basically just for coverage purposes
    test('it should capitalize a set of words', () => {
      expect(capitalize('Title')).toEqual('Title');
      expect(capitalize('a word')).toEqual('A word');
      expect(capitalize('\'ok')).toEqual('\'ok');
    });
  });

  describe('titleCase', () => {
    it('should title case a simple title', () => {
      expect(titleCase('A sImPlE TiTlE')).toEqual('A Simple Title');
    });

    it('should title case a title containing an article', () => {
      expect(titleCase('the lord of the rings')).toEqual('The Lord of the Rings');
    });
  });
});

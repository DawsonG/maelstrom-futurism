import { css } from '@emotion/react';
import { describe, expect, test } from 'vitest';
import { composeStyles, isSerializedStyles } from './composeStyles';

// ---------------------------------------------------------------------------
// isSerializedStyles
// ---------------------------------------------------------------------------

describe('isSerializedStyles', () => {
  describe('returns true for', () => {
    test('a SerializedStyles object, an array of SerializedStyles, an empty array, and a crafted object', () => {
      expect(isSerializedStyles(css`color: red;`)).toBe(true);
      expect(isSerializedStyles([css`color: red;`, css`font-size: 12px;`])).toBe(true);
      expect(isSerializedStyles([css`color: red;`])).toBe(true);
      expect(isSerializedStyles([])).toBe(true);
      expect(isSerializedStyles({ name: 'abc123', styles: 'color: red;' })).toBe(true);
    });
  });

  describe('returns false for', () => {
    test('falsy, a string, a number, CSSProperties-style object, objects with only styles, etc', () => {
      expect(isSerializedStyles(null)).toBe(false);
      expect(isSerializedStyles(undefined)).toBe(false);
      expect(isSerializedStyles('color: red;')).toBe(false);
      expect(isSerializedStyles(42)).toBe(false);
      expect(isSerializedStyles({ color: 'red', fontWeight: 'bold' })).toBe(false);
      expect(isSerializedStyles({ name: 'abc123' })).toBe(false);
      expect(isSerializedStyles({ styles: 'color: red;' })).toBe(false);
      expect(isSerializedStyles({ name: 123, styles: 'color: red;' })).toBe(false);
      expect(isSerializedStyles({ name: 'abc', styles: { color: 'red' } })).toBe(false);
      expect(isSerializedStyles([{ color: 'red' }])).toBe(false);
    });
  });
});

// ---------------------------------------------------------------------------
// composeStyles
// ---------------------------------------------------------------------------

describe('composeStyles', () => {
  describe('passthrough when there is nothing to merge', () => {
    test('returns the base style unchanged when overrides is undefined', () => {
      const base = css`color: blue;`;
      expect(composeStyles(base, undefined)).toBe(base);
    });

    test('returns the base style unchanged when called with no second argument', () => {
      const base = css`color: blue;`;
      expect(composeStyles(base)).toBe(base);
    });
  });

  describe('single override', () => {
    test('returns a new SerializedStyles — not the original base object', () => {
      const base = css`color: blue;`;
      const override = css`color: red;`;
      expect(composeStyles(base, override)).not.toBe(base);
    });

    test('composed styles string contains content from both base and override', () => {
      const base = css`color: blue;`;
      const override = css`font-size: 12px;`;
      const result = composeStyles(base, override);
      expect(result.styles).toContain('color: blue');
      expect(result.styles).toContain('font-size: 12px');
    });

    test('override declarations appear after base declarations (CSS cascade order)', () => {
      const base = css`color: blue;`;
      const override = css`color: red;`;
      const result = composeStyles(base, override);
      const bluePos = result.styles.indexOf('color: blue');
      const redPos  = result.styles.indexOf('color: red');
      expect(bluePos).toBeGreaterThanOrEqual(0);
      expect(redPos).toBeGreaterThan(bluePos);
    });

    test('conflicting property: the override value is the last occurrence in the styles string', () => {
      const base = css`color: blue;`;
      const override = css`color: red;`;
      const result = composeStyles(base, override);
      const lastOccurrence = result.styles.slice(result.styles.lastIndexOf('color:'));
      expect(lastOccurrence).toContain('color: red');
    });

    test('produces a single merged class — result has no next chain', () => {
      const base = css`color: blue;`;
      const override = css`font-size: 12px;`;
      expect(composeStyles(base, override).next).toBeUndefined();
    });

    test('result has a unique class name distinct from the base', () => {
      const base = css`color: blue;`;
      const override = css`font-size: 12px;`;
      expect(composeStyles(base, override).name).not.toBe(base.name);
    });
  });

  describe('array of overrides', () => {
    test('applies all overrides in order — each appears in the composed styles string', () => {
      const base      = css`color: blue;`;
      const override1 = css`font-size: 12px;`;
      const override2 = css`font-weight: bold;`;
      const result = composeStyles(base, [override1, override2]);
      expect(result.styles).toContain('color: blue');
      expect(result.styles).toContain('font-size: 12px');
      expect(result.styles).toContain('font-weight: bold');
    });

    test('later overrides appear after earlier ones in the styles string', () => {
      const base      = css`color: blue;`;
      const override1 = css`font-size: 12px;`;
      const override2 = css`font-weight: bold;`;
      const result = composeStyles(base, [override1, override2]);
      const pos1 = result.styles.indexOf('font-size: 12px');
      const pos2 = result.styles.indexOf('font-weight: bold');
      expect(pos2).toBeGreaterThan(pos1);
    });

    test('last array item wins for a conflicting property', () => {
      const base      = css`color: blue;`;
      const override1 = css`color: green;`;
      const override2 = css`color: red;`;
      const result = composeStyles(base, [override1, override2]);
      const lastOccurrence = result.styles.slice(result.styles.lastIndexOf('color:'));
      expect(lastOccurrence).toContain('color: red');
    });

    test('empty array is a no-op — returns base unchanged', () => {
      const base = css`color: blue;`;
      expect(composeStyles(base, [])).toBe(base);
    });
  });

  describe('idempotency & determinism', () => {
    test('composing the same two styles twice produces the same class name', () => {
      const base     = css`color: blue;`;
      const override = css`font-size: 12px;`;
      const result1  = composeStyles(base, override);
      const result2  = composeStyles(base, override);
      expect(result1.name).toBe(result2.name);
    });
  });
});

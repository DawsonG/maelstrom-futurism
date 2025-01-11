import { describe, expect, test } from "vitest";
import { isFunction, isString } from "./typeof";

describe("typeof", () => {
    test("isFunction", () => {
        expect(isFunction(() => false)).toBe(true);
        expect(isFunction(function testCase() {
            return;
        })).toBe(true);
        expect(isFunction([])).toBe(false);
        expect(isFunction({})).toBe(false);
        expect(isFunction("string")).toBe(false);
    });

    test("isString", () => {
        expect(isString("test")).toBe(true);
        expect(isString("")).toBe(true);
        expect(isString(new String())).toBe(true);
        expect(isString([])).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString(undefined)).toBe(false);
    });
});
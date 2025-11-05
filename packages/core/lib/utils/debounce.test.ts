import { afterAll, beforeAll, describe, expect, Mock, test, vi, vitest } from "vitest";
import { debounce } from "./debounce";

describe('debounce', () => {
    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    let func: Mock;
    let debouncedFunc: Function;

    test('it executes a given function just once in 1000ms', () => {
        func = vitest.fn();
        debouncedFunc = debounce(func, 1000);

        for (let i = 0; i < 100; i++) {
            debouncedFunc();
        }

        // Fast-forward time
        vi.runAllTimers();

        expect(func).toBeCalledTimes(1);
    });
});
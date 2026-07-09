import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";

import isBot from "./isBot";
import BotLockedContent from "./BotLockedContent";

vi.mock(import('./isBot'), () => ({
    default: vi.fn(),
    defaultMethodFlags: {
        userAgent: true,
        resolutionCheck: true,
        imageResolver: true,
        cssSupported: true,
    }
}));

describe('BotLockedContent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    test('should show botContent when isBot is true', async () => {
        (isBot as Mock).mockResolvedValue(true);
        const { queryByText } = render(<BotLockedContent
            botChildren={<h1>BOT</h1>}
            children={<h1>HUMAN</h1>}
        />);

        await waitFor(() => expect(queryByText('BOT')).toBeTruthy());
        expect(queryByText('HUMAN')).toBeFalsy();
    });

    test('should show content when isBot is false', async () => {
        (isBot as Mock).mockResolvedValue(false);

        const { queryByText } = render(<BotLockedContent
            botChildren={<h1>BOT</h1>}
            children={<h1>HUMAN</h1>}
        />);

        await waitFor(() => expect(queryByText('HUMAN')).toBeTruthy());
        expect(queryByText('BOT')).toBeFalsy();
    });
});
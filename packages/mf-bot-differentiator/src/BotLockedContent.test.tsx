import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

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

    test('should show botContent when isBot is true', () => {
        (isBot as Mock).mockReturnValue(true);
        const { queryByText } = render(<BotLockedContent 
            botChildren={<h1>BOT</h1>}
            children={<h1>HUMAN</h1>} 
        />);
        
        expect(queryByText('BOT')).toBeTruthy();
        expect(queryByText('HUMAN')).toBeFalsy();
    });

    test('should show content when isBot is false', () => {
        (isBot as Mock).mockReturnValue(false);

        const { queryByText } = render(<BotLockedContent 
            botChildren={<h1>BOT</h1>}
            children={<h1>HUMAN</h1>}
        />);
        
        expect(queryByText('BOT')).toBeFalsy();
        expect(queryByText('HUMAN')).toBeTruthy();
    });
});
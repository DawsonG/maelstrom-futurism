import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Paper, PaperProps } from '@maelstrom-futurism/paper';

import isBot, { ProtectionMethodFlags, defaultMethodFlags } from './isBot';

interface BotLockedContentProps extends PaperProps {
    botChildren: ReactNode; // the content to display if we do not believe the viewer is human
    methodFlags?: ProtectionMethodFlags;
}

const BotLockedContent = ({
    children,
    botChildren,
    methodFlags = defaultMethodFlags,
    ...rest
}: BotLockedContentProps): ReactElement => {
    const [isBotVisitor, setIsBotVisitor] = useState(false);

    useEffect(() => {
        let cancelled = false;

        isBot(methodFlags).then((result) => {
            if (!cancelled) setIsBotVisitor(result);
        });

        return () => {
            cancelled = true;
        };
    }, [methodFlags]);

    return <Paper {...rest}>{isBotVisitor ? botChildren : children}</Paper>;
};

export default BotLockedContent;
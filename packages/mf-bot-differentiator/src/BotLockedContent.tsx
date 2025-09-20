import { ReactElement, ReactNode } from 'react';
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
}: BotLockedContentProps): ReactElement => (<Paper {...rest}>
        {isBot(methodFlags) ? botChildren : children}
    </Paper>
);

export default BotLockedContent;
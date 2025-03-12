import { ReactNode } from 'react';
import Paper from '@maelstrom-futurism/paper';

import isBot, { ProtectionMethodFlags, defaultMethodFlags } from './isBot';

interface BasiliskProps {
    children: ReactNode; // the content to display if we believe the viewer is human
    botChildren: ReactNode; // the content to display if we do not believe the viewer is human
    methodFlags?: ProtectionMethodFlags;
}

const Basilisk = ({ children, botChildren, methodFlags = defaultMethodFlags }: BasiliskProps): JSX.Element => {

    return <Paper
        pre={true}
        font='"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;'>
            {isBot(methodFlags) ? botChildren : children}
        </Paper>;
};

export default Basilisk;
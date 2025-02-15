import Paper from '@maelstrom-futurism/paper';
import obfuscate from "./stringManipulation";

type SafeFont = 'HelveticaNeue' | 'Helvetica' | 'Arial' | 'Courier' | 'Lucida Grande';

interface ProtectionMethodFlags {
    userAgent?: boolean;
    obfuscateText?: boolean;
}

interface BasiliskProps {
    text: string;
    font?: SafeFont;
    methodFlags?: ProtectionMethodFlags;
}

// Safe fonts: Arial, Helvetica, Courier
// Unsafe fonts: Poppins

const Basilisk = ({ text, font, methodFlags }: BasiliskProps): JSX.Element => {
    return <Paper
        pre={true}
        font='"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;'>
            {obfuscate(text)}
        </Paper>;
};

export default Basilisk;
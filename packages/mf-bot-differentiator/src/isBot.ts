export interface ProtectionMethodFlags {
    userAgent?: boolean;
    resolutionCheck?: boolean;
    imageResolver?: boolean;
}

export const defaultMethodFlags: ProtectionMethodFlags = {
    userAgent: true,
    resolutionCheck: false,
    imageResolver: false,
}

// 

const isBot = (methodFlags: ProtectionMethodFlags) => {
    return false;
}

export default isBot;
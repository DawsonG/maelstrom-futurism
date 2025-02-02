import { lazy as _lazy } from "react";

function lazy(importFn: Function) {
    return _lazy(async () => {
        const m = await importFn();
        return { default: m.ReactComponent };
    });
}

export const icons = {
    Add: lazy(async () => import('../assets/add.svg'))
};
import { css } from '@emotion/react';

export const base = css`
    position: absolute;
    background-color: var(--mf-content);
    color: var(--mf-text);
    padding: 12px;
    border: 1px solid var(--mf-border-muted);
    border-radius: var(--mf-radius-card);
    z-index: 1000;
    min-width: 200px;
`;

export const top = css`
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
`;

export const bottom = css`
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
`;

export const left = css`
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 8px;
`;

export const right = css`
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
`;

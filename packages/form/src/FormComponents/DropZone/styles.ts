import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';

export const container = css`
    margin-top: 0.5em;

    label {
        display: block;
        color: var(--mf-text-muted);
        margin-bottom: 0.5em;
    }
`;

export const dropZone = (isDragActive: boolean, hasError: boolean) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    box-sizing: border-box;
    width: 100%;
    padding: 2em 1em;
    border: dashed var(--mf-border-width-medium) ${hasError ? 'var(--mf-alert)' : (isDragActive ? 'var(--mf-focus)' : 'var(--mf-secondary)')};
    border-radius: var(--mf-radius-input);
    background-color: ${isDragActive ? 'var(--mf-surface-hover)' : 'var(--mf-content)'};
    color: var(--mf-text-muted);
    text-align: center;
    cursor: pointer;
    transition: border-color var(--mf-dur-fast) ${EASE_FUNCTION}, background-color var(--mf-dur-fast) ${EASE_FUNCTION};

    &:hover {
        border-color: ${hasError ? 'var(--mf-alert)' : 'var(--mf-text)'};
    }

    &:focus-visible {
        outline: var(--mf-border-width-thin) solid var(--mf-focus);
        outline-offset: 2px;
    }

    input[type="file"] {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
`;

export const dropZonePrompt = css`
    font-size: 1rem;
`;

export const dropZoneHint = css`
    font-size: 0.85em;
    opacity: 0.8;
`;

export const fileList = css`
    list-style: none;
    margin: 0.75em 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export const fileItem = css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75em;
    padding: 0.5em 0.75em;
    border: solid 1px var(--mf-secondary);
    border-radius: var(--mf-radius-input);
    background-color: var(--mf-content);
`;

export const thumbnail = css`
    width: 2.5rem;
    height: 2.5rem;
    flex: none;
    border-radius: var(--mf-radius-input);
    object-fit: cover;
    background-color: var(--mf-surface-hover);
`;

export const fileIcon = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    flex: none;
    border-radius: var(--mf-radius-input);
    background-color: var(--mf-surface-hover);
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--mf-text-muted);
`;

export const fileMeta = css`
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
`;

export const fileName = css`
    font-size: 0.95em;
    color: var(--mf-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const fileSize = css`
    font-size: 0.8em;
    color: var(--mf-text-muted);
`;

export const removeButton = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    padding: 0;
    width: 1.75rem;
    height: 1.75rem;
    border: none;
    border-radius: var(--mf-radius-input);
    background: none;
    font-size: 1.2rem;
    line-height: 1;
    color: var(--mf-text-muted);
    cursor: pointer;

    &:hover {
        color: var(--mf-text);
        background-color: var(--mf-surface-hover);
    }
`;

export const helpText = css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    opacity: 0.7;
`;

export const errorText = css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    color: var(--mf-alert);
`;

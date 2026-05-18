import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';

export const groupContainer = css`
    background-color: inherit;
    margin-top: 14px;
`;

export const groupLabel = css`
    display: block;
    font-size: 1rem;
    color: var(--mf-text-muted);
    margin-bottom: 8px;
`;

export const helpText = css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    opacity: 0.7;
`;

export const optionsContainer = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const materialStyledControl = (inputType: 'checkbox' | 'radio') => {
    const isRadio = inputType === 'radio';
    const sel = `input[type="${inputType}"]`;

    return css`
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        user-select: none;
        padding: 4px 0;
        border-bottom: 1px solid transparent;
        transition: border-color var(--mf-dur-normal) ${EASE_FUNCTION};

        ${sel} {
            appearance: none;
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            border: 2px solid var(--mf-secondary);
            border-radius: ${isRadio ? '50%' : '3px'};
            position: relative;
            cursor: pointer;
            flex-shrink: 0;
            transition: border-color var(--mf-dur-normal) ${EASE_FUNCTION}${isRadio ? '' : `, background var(--mf-dur-normal) ${EASE_FUNCTION}`};
            background: transparent;
        }

        ${sel}::after {
            content: '';
            position: absolute;
            ${isRadio ? `
                width: 10px;
                height: 10px;
                background: var(--mf-secondary);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                transition: transform var(--mf-dur-normal) ${EASE_FUNCTION}, background var(--mf-dur-normal) ${EASE_FUNCTION};
            ` : `
                left: 4px;
                top: 1px;
                width: 5px;
                height: 9px;
                border: 2px solid var(--mf-content);
                border-top: none;
                border-left: none;
                transform: rotate(45deg) scale(0);
                transition: transform var(--mf-dur-normal) ${EASE_FUNCTION};
            `}
        }

        ${sel}:checked {
            ${isRadio ? '' : 'background: var(--mf-active);'}
            border-color: var(--mf-active);
        }

        ${sel}:checked::after {
            ${isRadio
                ? `background: var(--mf-active); transform: translate(-50%, -50%) scale(1);`
                : `transform: rotate(45deg) scale(1);`
            }
        }

        ${sel}:hover {
            border-color: var(--mf-text);
        }

        ${sel}:focus-visible {
            outline: 2px solid var(--mf-focus);
            outline-offset: 2px;
            border-color: var(--mf-focus);
        }

        ${sel}:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        label {
            font-size: var(--mf-size-base);
            color: var(--mf-text);
            cursor: pointer;
            transition: color var(--mf-dur-normal) ${EASE_FUNCTION};
        }

        &:has(${sel}:checked) label {
            color: var(--mf-active);
        }

        ${sel}:disabled ~ label {
            opacity: 0.4;
            cursor: not-allowed;
        }
    `;
};

export const materialStyledCheckbox = materialStyledControl('checkbox');
export const materialStyledRadio = materialStyledControl('radio');

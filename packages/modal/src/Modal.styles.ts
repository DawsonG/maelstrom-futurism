import { css, keyframes, SerializedStyles } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';

import type { Placement } from './Modal';

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--mf-z-high);
  width: 100vw;
  height: 100vh;
  background-color: var(--mf-background);
  opacity: 0.8;
`;

export const modalWrapper = css`
  z-index: var(--mf-z-top);
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

const modalEnter = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const modal = css`
  z-index: var(--mf-z-top);
  background: var(--mf-content);
  color: var(--mf-text);
  border-radius: var(--mf-radius-card);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 1.75rem auto;
  max-width: 85%;
  min-height: 200px;
  padding: 1rem 0.75rem;
  animation: ${modalEnter} var(--mf-dur-normal) ${EASE_FUNCTION};
`;

const drawerSlideIn: Record<Placement, ReturnType<typeof keyframes>> = {
  left: keyframes`from { transform: translateX(-100%); } to { transform: translateX(0); }`,
  right: keyframes`from { transform: translateX(100%); } to { transform: translateX(0); }`,
  top: keyframes`from { transform: translateY(-100%); } to { transform: translateY(0); }`,
  bottom: keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`,
};

const drawerPlacement: Record<Placement, SerializedStyles> = {
  left: css`
    top: 0;
    left: 0;
    height: 100vh;
    max-width: 400px;
  `,
  right: css`
    top: 0;
    right: 0;
    height: 100vh;
    max-width: 400px;
  `,
  top: css`
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
  `,
  bottom: css`
    bottom: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
  `,
};

export const getDrawerStyle = (placement: Placement): SerializedStyles => css`
  position: fixed;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  transform: none;
  border-radius: 0;
  margin: 0;
  overflow-y: auto;
  ${drawerPlacement[placement]}
  animation: ${drawerSlideIn[placement]} var(--mf-dur-normal) ${EASE_FUNCTION};
`;

export const modalHeader = css`
  display: flex;
  justify-content: flex-end;
  padding: 0.15rem 0 0.5rem 0;

  .title {
    font-weight: bold;
    text-transform: uppercase;
    flex-grow: 1;
  }
`;

export const modalCloseButton = css`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  background-color: transparent;
  color: var(--mf-text);
  opacity: 0.3;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 1;
  }
`;

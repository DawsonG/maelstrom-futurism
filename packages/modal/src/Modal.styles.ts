import { css } from "@emotion/react";

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

export const modalWrapper = css`
  z-index: 1050;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

export const modal = css`
  z-index: 1060;
  background: white;
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 1.75rem auto;
  max-width: 500px;
  min-width: 300px;
  min-height: 200px;
  padding: 1rem 0.75rem;
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
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 1;
  }
`;

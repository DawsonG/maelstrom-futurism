import { css } from "@emotion/core";

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

export const modal = css`
  z-index: 1050;
  background: white;
  position: relative;
  margin: 1.75rem auto;
  border-radius: 3px;
  max-width: 500px;
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
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  border: none;
`;

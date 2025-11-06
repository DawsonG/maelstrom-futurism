import React from "react";
import ReactDOM from "react-dom";
import { useTheme } from "@maelstrom-futurism/core";

import {
  modalOverlay,
  modalWrapper,
  modal,
  modalHeader,
  modalCloseButton,
} from "./Modal.styles";
import { css } from "@emotion/react";


interface ModalProps {
  title?: string;
  children?: React.ReactNode;

  isShowing?: boolean | (() => void);
  hide: () => void; //(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Modal = ({
  title, children, isShowing, hide 
}: ModalProps) : JSX.Element | null => {
  const theme = useTheme();
  const modalModStyle = css`
    color: black;
    border-radius: ${theme.borderRadius};
  `;

  return isShowing ? ReactDOM.createPortal(
    <>
      <div css={modalOverlay} onClick={() => hide()} />
      <div
        css={modalWrapper}
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div css={[modal, modalModStyle]}>
          <div css={modalHeader}>
            <div className="title">{title}</div>
            <button
              type="button"
              css={modalCloseButton}
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {children}
        </div>
      </div>
    </>,
    document.body
  ) : null;
}

export default Modal;

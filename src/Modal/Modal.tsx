import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import {
  modalOverlay,
  modalWrapper,
  modal,
  modalHeader,
  modalCloseButton
} from "./Modal.styles";

interface IModal {
  title?: string;
  children?: React.ReactNode;

  isShowing?: boolean | (() => void);
  hide?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Modal: React.FC<IModal> = ({ title, children, isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <Fragment>
          <div css={modalOverlay} onClick={() => hide(null)} />
          <div
            css={modalWrapper}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div css={modal}>
              <div css={modalHeader}>
                {title}
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
        </Fragment>,
        document.body
      )
    : null;

export default Modal;

import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import {
  modalOverlay,
  modal,
  modalHeader,
  modalCloseButton
} from "./Modal.styles";

interface IModal {
  title?: string;
  children?: React.ReactNode;

  isShowing?: boolean | (() => void);
  hide?: () => void; //(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Modal: React.FC<IModal> = ({ title, children, isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <Fragment>
          <div
            css={modalOverlay}
            onClick={e => {
              e.preventDefault();
              console.log("overlay clicked");
              hide();
            }}
          />
          <div css={modal} aria-modal aria-hidden tabIndex={-1} role="dialog">
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
        </Fragment>,
        document.body
      )
    : null;

export default Modal;

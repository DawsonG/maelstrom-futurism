import { CSSProperties, ReactNode } from 'react';
import { composeStyles, isSerializedStyles, StyleOverride } from '@maelstrom-futurism/core';
import ReactDOM from 'react-dom';
import {
  modalOverlay,
  modalWrapper,
  modal,
  modalHeader,
  modalCloseButton,
} from './Modal.styles';

interface ModalProps {
  title?: string;
  children?: ReactNode;
  /** Style override targeting the modal panel. */
  styles?: StyleOverride;
  className?: string;
  isShowing?: boolean | (() => void);
  hide: () => void;
}

const Modal = ({
  title, children, isShowing, hide, styles, className,
}: ModalProps): ReactNode | null => {
  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(modal, styles)
    : modal;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div css={modalOverlay} onClick={() => hide()} />
          <div
            css={modalWrapper}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div css={emotionStyle} style={inlineStyle} className={className}>
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
        document.body,
      )
    : null;
};

export default Modal;

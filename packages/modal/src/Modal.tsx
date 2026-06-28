import { CSSProperties, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { css, SerializedStyles } from '@emotion/react';
import { composeStyles, isSerializedStyles, StyleOverride } from '@maelstrom-futurism/core';

import {
  modalOverlay,
  modalWrapper,
  modal,
  modalHeader,
  modalCloseButton,
} from './Modal.styles';


export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const getSizeStyle = (size?: Sizes): SerializedStyles | null => {
  switch(size) {
    case 'sm':
      return css`width: 500px;`;
    case 'md':
      return css`width: 760px;`;
    case 'lg':
      return css`width: 900px;`;
    case 'xl':
      return css`width: 1100px;`;
    case 'xs':
    default:
      return null;
  }
};

interface ModalProps {
  title?: string;
  children?: ReactNode;
  /** Style override targeting the modal panel. */
  styles?: StyleOverride;
  className?: string;
  size?: Sizes;
  isShowing?: boolean | (() => void);
  hide: () => void;
}

const Modal = ({
  title, children, isShowing, hide, styles, className, size,
}: ModalProps): ReactNode | null => {
  const modalCss = css`${modal}${getSizeStyle(size)}`;
  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(modalCss, styles)
    : modalCss;

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

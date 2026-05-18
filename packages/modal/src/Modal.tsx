import { ReactNode } from 'react';
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

  isShowing?: boolean | (() => void);
  hide: () => void; // (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Modal = ({
  title, children, isShowing, hide,
}: ModalProps): ReactNode | null => {
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
            <div css={modal}>
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

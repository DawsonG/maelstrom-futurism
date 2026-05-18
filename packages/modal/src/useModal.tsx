import React, { ReactNode, useState } from 'react';
import Modal from './Modal';

interface RenderModalProps {
  title?: string;
  children: ReactNode;
}

export const useModal = (): [
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  (props: RenderModalProps) => ReactNode,
  boolean,
] => {
  const [isVisible, setIsVisible] = useState(false);

  function toggle() {
    setIsVisible(!isVisible);
  }

  const RenderModal = ({ title, children }: RenderModalProps): ReactNode => (
    <>
      {isVisible && (
        <Modal title={title} hide={toggle} isShowing={isVisible}>
          {children}
        </Modal>
      )}
    </>
  );

  return [toggle, RenderModal, isVisible];
};

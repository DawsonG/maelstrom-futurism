import React, { useState } from "react";
import Modal from "./Modal";

interface RenderModalProps {
  title?: string;
  children: React.ReactChild;
}

export const useModal = (): [
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  (props: RenderModalProps) => JSX.Element,
  boolean
] => {
  const [isVisible, setIsVisible] = useState(false);

  function toggle() {
    setIsVisible(!isVisible);
  }

  const RenderModal= ({ title, children }: RenderModalProps): JSX.Element => (
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

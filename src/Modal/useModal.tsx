import React, { Fragment, useState } from "react";
import Modal from "./Modal";

interface IRenderModal {
  title?: string;
  children: React.ReactChild;
}

const useModal = (): [
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  React.FC<IRenderModal>,
  boolean
] => {
  const [isVisible, setIsVisible] = useState(false);

  function toggle() {
    setIsVisible(!isVisible);
  }

  const RenderModal: React.FC<IRenderModal> = ({ title, children }) => (
    <Fragment>
      {isVisible && (
        <Modal title={title} hide={toggle} isShowing={isVisible}>
          {children}
        </Modal>
      )}
    </Fragment>
  );

  return [toggle, RenderModal, isVisible];
};

export default useModal;

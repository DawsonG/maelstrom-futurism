import { useState } from "react";

type useModalFunction = () => [
  boolean,
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
];

const useModal: useModalFunction = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return [isShowing, toggle];
};

export default useModal;

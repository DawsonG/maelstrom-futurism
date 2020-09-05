import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  useLayoutEffect
} from "react";
import { useScrollData } from "scroll-data-hook";

import MenuToggle from "./children/MenuToggle";
import { Group, Brand, Link } from "./children";
import * as styles from "./Navbar.styles";
import theme from "../theme";

export enum ToggleSide {
  RIGHT = "right",
  LEFT = "left"
}

type ChildProps = { children?: ReactNode };

interface INavbarProps {
  children?: ReactNode;
  sticky?: boolean;
  toggleSide?: ToggleSide | string;
}

interface INavbar extends React.FC<INavbarProps> {
  Group: (props: ChildProps) => any;
  Brand: (props: ChildProps) => any;
  Link: (props?: any) => any;
  // Dropdown: (props: ChildProps) => any;
}

const Navbar: INavbar = ({
  children,
  sticky = false,
  toggleSide = ToggleSide.LEFT
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(`(max-width: ${theme.bp("sm")})`);
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  let offsetTop: number = 0;
  const headerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    offsetTop = headerRef.current.offsetTop;
  });

  const {
    position: { y }
  } = useScrollData({});

  return (
    <nav
      css={styles.navbar}
      ref={headerRef}
      className={sticky && y > offsetTop ? "sticky" : null}
    >
      {toggleSide === ToggleSide.LEFT && <MenuToggle onClick={toggleNav} />}
      {(!isSmallScreen || isOpen) && children}
      {toggleSide === ToggleSide.RIGHT && <MenuToggle onClick={toggleNav} />}
    </nav>
  );
};

Navbar.Brand = Brand;
Navbar.Link = Link;
Navbar.Group = Group;
export default Navbar;

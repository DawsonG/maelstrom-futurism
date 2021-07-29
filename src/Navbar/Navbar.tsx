import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";

import MenuToggle from "./children/MenuToggle";
import { Group, Brand, Link } from "./children";
import * as styles from "./Navbar.styles";
import theme from "../theme";

export enum ToggleSide {
  RIGHT = "right",
  LEFT = "left",
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
  toggleSide = ToggleSide.LEFT,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  let offsetTop: number = 0;

  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    e.stopPropagation(); // necessary?
    
    if (!headerRef.current) return;
    if (!sticky) return;
    
    if (window.pageYOffset > offsetTop) {
      headerRef.current.className = "sticky";   
    } else {
      headerRef.current.className = ""; 
    }
  };

  const toggleNav = () => setIsOpen(!isOpen);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia(`(max-width: ${theme.bp("sm")})`);
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
  
  useLayoutEffect(() => {
    if (!headerRef.current) return;
    
    offsetTop = headerRef.current.offsetTop;
  });

  return (
    <nav
      css={styles.navbar}
      ref={headerRef}
      onScroll={handleScroll}
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

import React, { PureComponent } from "react";

import * as styles from "./Header.styles";

interface HeaderInterface {}

class Header extends PureComponent<HeaderInterface> {
  private headerRef = React.createRef<HTMLDivElement>();
  private sticky = 0;

  componentDidMount() {
    const header = this.headerRef.current;
    header.parentElement.onscroll = window.onscroll = this.onScroll;
    this.sticky = header.offsetTop;
  }

  onScroll = () => {
    const header = this.headerRef.current;
    if (window.pageYOffset > this.sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  render() {
    return (
      <header ref={this.headerRef} css={styles.header}>
        <ul>
          <li className="active">
            <a href="#">Page One</a>
          </li>
          <li>
            <a href="#">Page Two</a>
          </li>
          <li>
            <a href="#">Page Three</a>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;

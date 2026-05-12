import { ReactElement, ReactNode } from 'react';
import { useTheme } from '@maelstrom-futurism/core';
import { Container } from '@maelstrom-futurism/layout';

import styles from './Navbar.module.scss';

interface NavbarProps {
    brand?: ReactElement;
    rightSide?: ReactElement;
}

const Navbar = ({ brand, rightSide }: NavbarProps): ReactNode => {
    const theme = useTheme();
    return (
        <div className={styles.navbarRow} style={{ borderBottom: `1px solid ${theme.color('borderMuted')}` }}>
            <Container className={styles.navbarWrapper}>
                {brand}
                {rightSide}
            </Container>
        </div>
    );
}

export default Navbar;
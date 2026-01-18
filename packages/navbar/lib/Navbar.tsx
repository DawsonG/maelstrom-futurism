import { ReactElement, ReactNode } from 'react';
import { Container } from '@maelstrom-futurism/layout';

import styles from './Navbar.module.scss';

interface NavbarProps {
    brand?: ReactElement;
    rightSide?: ReactElement;
}

const Navbar = ({ brand, rightSide }: NavbarProps): ReactNode => {
    return (
        <div className={styles.navbarRow}>
            <Container className={styles.navbarWrapper}>
                {brand}
                {rightSide}
            </Container>
        </div>
    );
}

export default Navbar;
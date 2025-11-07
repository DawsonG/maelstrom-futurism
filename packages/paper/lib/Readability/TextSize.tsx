import { ReactNode } from 'react';
import styles from './TextSize.module.scss';

// interface TextSizeProps {}

const TextSize = (): ReactNode => <div className={styles.textSize}>
    <label>Text Size</label>
    <div className={styles.textSizeBar}>
        <button className={styles.smallerButton}>A</button>
        <button className={styles.largerButton}>A</button>
    </div>
</div>;

export default TextSize;
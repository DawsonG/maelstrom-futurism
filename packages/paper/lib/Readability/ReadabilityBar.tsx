import { ReactElement } from 'react';

import styles from './ReadabilityBar.module.scss';
import TextSize from './TextSize';

const ReadabilityBar = (): ReactElement => {
  return (
    <div className={styles.readabilityBar}>

      <TextSize />
    </div>
  );
};

export default ReadabilityBar;

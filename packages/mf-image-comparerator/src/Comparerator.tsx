import { type ReactElement, useState, useRef, useEffect } from 'react';
import * as styles from './Comparerator.module.scss';

interface CompareratorProps {
    leftImage: string;
    rightImage: string;
}

const Comparerator = ({ leftImage, rightImage }: CompareratorProps): ReactElement => {

    return <div className={styles.container}>
        
    </div>;
};

export default Comparerator;
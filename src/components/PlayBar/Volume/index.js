import React from 'react';
import { Icon, Slider, Popover } from 'antd';
import styles from './index.module.less';

export default props => {
    const { vol, setVol } = props;

    const handleChange = (val) => {
        setVol(+val)
    }

    const soundContent = (
        <div className={styles.slider}>
            <Slider vertical step={5} defaultValue={vol} onChange={handleChange} />
        </div>
    )

    return (
        <Popover overlayClassName={styles.popover} content={soundContent}>
            <Icon type='sound' />
        </Popover>
    );
};

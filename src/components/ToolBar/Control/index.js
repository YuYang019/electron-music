import React from 'react';
import { Icon } from 'antd';
import styles from './index.module.less';

export default (props) => {
  return (
    <div className={styles.control}>
        <div className={styles.back}>
            <Icon type="left" />
        </div>
        <div className={styles.push}>
            <Icon type="right" />
        </div>
    </div>
  )
}

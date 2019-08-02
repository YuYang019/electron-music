import React from 'react';
import styles from './index.module.less';

export default (props) => {
  return (
    <div className={styles.control}>
        <div className={styles.back}>
            <i className="iconfont icon-left"></i>
        </div>
        <div className={styles.push}>
            <i className="iconfont icon-right"></i>
        </div>
    </div>
  )
}

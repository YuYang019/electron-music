import React from 'react';
import styles from './index.module.less';

export default (props) => {
  return (
    <div className={styles.search}>
      <input type="text" />
      <i className="iconfont icon-search" />
    </div>
  )
}

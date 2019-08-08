import React from 'react';
import { Icon } from 'antd';
import styles from './index.module.less';

export default (props) => {
  return (
    <div className={styles.search}>
      <input type="text" />
      <Icon type="search" />
    </div>
  )
}

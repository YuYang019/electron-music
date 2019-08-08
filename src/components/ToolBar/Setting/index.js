import React from 'react';
import { Icon } from 'antd';
import styles from './index.module.less';

export default (props) => {
  return (
    <div className={styles.setting}>
        <Icon type="setting" theme="filled" />
    </div>
  )
}

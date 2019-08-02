import React from 'react';
import Control from './Control';
import Search from './Search';
import Setting from './Setting';
import styles from './index.module.less';

export default (props) => {
  return (
    <div style={{'-webkit-app-region': 'drag'}} className={styles.toolBar}>
        <Control />
        <Search />
        <Setting />
    </div>
  )
}

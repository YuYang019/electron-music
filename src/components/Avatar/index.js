import React from 'react';
import styles from './index.module.less';

export default props => {
  return (
    <div className={styles.avatar}>
      <img className={styles.avatarImg}></img>
      <div className={styles.right}>
        <p className={styles.name}>myasdy</p>
        <p className={styles.icon}>welcome</p>
      </div>
    </div>
  );
};

import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export default (props) => {
    const { stop, className } = props
    console.log(className)

    const classnames = classNames(styles.musicIcon, className, {
        [styles.stop]: stop
    })
    
    return (
        <div className={classnames}>
            <div className={styles.left}></div>
            <div className={styles.mid}></div>
            <div className={styles.right}></div>
        </div>
    )
}
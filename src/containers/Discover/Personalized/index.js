/**
 * 推荐歌单
 */

import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import { sampleSize } from 'lodash';
import { personalized } from '@/api';
import styles from './index.module.less';

function getSongList(data) {
    if (data.length > 10) {
        data = sampleSize(data, 10);
    }
    return data.map(item => (
        <div key={item.id} className={styles.item}>
            <img className={styles.img} src={item.picUrl} alt={item.name} />
            <p>{item.name}</p>
        </div>
    ))
}

export default () => {
    const [list, setList] = useState(null);

    useEffect(() => {
        personalized().then(res => {
            setList(res.result);
        });
    }, []);

    if (!list) {
        return (
            <div className={styles.personalized}>
                aaa
            </div>
        )
    }

    return (
        <div className={styles.personalized}>
            <p className={styles.title}>
                推荐歌单
                <Icon type="right" />
            </p>
            <div className={styles.listWrapper}>
                {getSongList(list)}
            </div>
        </div>
    );
};

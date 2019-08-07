import React, { useState, useEffect } from 'react';
import { personalized } from '@/api';
import styles from './index.module.less';

function getSongList(data) {
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
            <div className={styles.listWrapper}>
                {getSongList(list)}
            </div>
        </div>
    );
};

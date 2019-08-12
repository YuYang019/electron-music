/**
 * 推荐歌单
 */

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import { sampleSize } from 'lodash';
import { personalized } from '@/api';
import styles from './index.module.less';

function getCount(num) {
    num = +num;
    if (num < 10000) {
        return num
    } else {
        return `${Math.round(num / 10000)}万`
    }
}

function getSongList(data, handleClick) {
    if (data.length > 10) {
        data = sampleSize(data, 10);
    }
    return data.map(item => (
        <div key={item.id} className={styles.item} onClick={() => handleClick(item.id)}>
            <img className={styles.img} src={item.picUrl} alt={item.name} />
            <p>{item.name}</p>
            <div className={styles.playCount}>
                <Icon type="caret-right" />
                {getCount(item.playCount)}
            </div>
            <div className={styles.playIcon}>
                <Icon type="caret-right" theme="filled" />
            </div> 
        </div>
    ))
}

const Personalized = (props) => {
    const [list, setList] = useState(null);

    const { history } = props;

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

    function handleClick(id) {
        history.push(`/playlist/${id}`);
    }

    return (
        <div className={styles.personalized}>
            <p className={styles.title}>
                推荐歌单
                <Icon type="right" />
            </p>
            <div className={styles.listWrapper}>
                {getSongList(list, handleClick)}
            </div>
        </div>
    );
};

export default withRouter(Personalized)

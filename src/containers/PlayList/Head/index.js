import React from 'react';
import { Icon } from 'antd';
import { getDate, getCount } from '@/utils';
import styles from './index.module.less';


function getTag(tags) {
    return tags.join(' / ')
}

export default props => {
    const {
        data: {
            tags,
            description,
            name,
            coverImgUrl,
            playCount,
            trackCount,
            subscribedCount,
            shareCount,
            createTime,
            creator: { nickname, avatarUrl }
        },
    } = props;
    return (
        <div className={styles.head}>
            <div className={styles.cover}>
                <img src={coverImgUrl} />
            </div>
            <div className={styles.content}>
                <p className={styles.title}>
                    <span className={styles.icon}>歌单</span>
                    <span>{name}</span>
                </p>
                <div className={styles.creator}>
                    <img src={avatarUrl} />
                    <span>{nickname}</span>
                    <span className={styles.createTime}>{getDate(createTime)}创建</span>
                </div>
                <div className={styles.operator}>
                    <div className={styles.active}>
                        <Icon type="play-circle" />
                        播放全部
                    </div>
                    <div>
                        <Icon type="folder-add" />
                        收藏({subscribedCount})
                    </div>
                    <div>
                        <Icon type="share-alt" />
                        分享({shareCount})
                    </div>
                    <div>下载全部</div>
                </div>
                <div className={styles.tags}>
                    <span>标&emsp;签：</span>{getTag(tags)}
                </div>
                <div className={styles.counts}>
                    <span>歌曲数：</span>{trackCount}
                    <span style={{ marginLeft: 15 }}>播放数：</span>{getCount(playCount)}
                </div>
                <div className={styles.description}>
                    <span>简&emsp;介：</span>{description}
                </div>
            </div>
        </div>
    );
};

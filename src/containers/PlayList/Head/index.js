import React from 'react';
import styles from './index.module.less';

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
                    {name}
                </p>
                <div className={styles.creator}>
                    <img src={avatarUrl} />
                    <span>{nickname}</span>
                    <span>{createTime}</span>
                </div>
                <div className={styles.operator}>
                    <div>播放全部</div>
                    <div>收藏</div>
                    <div>分享</div>
                    <div>下载全部</div>
                </div>
                <div className={styles.tags}>
                    标签：{tags}
                </div>
                <div className={styles.counts}>
                    歌曲数：{trackCount}
                    播放数：{playCount}
                </div>
                <div className={styles.description}>
                    简介：{description}
                </div>
            </div>
        </div>
    );
};

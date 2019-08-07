import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { privateContent } from '@/api';
import styles from './index.module.less';

function getSlideData(data) {
    return data.map(album => (
        <div key={album.id} className={styles.imgWrapper}>
            <img className={styles.img} src={album.picUrl} alt={album.name} />
        </div>
    ))
}

export default () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        privateContent().then(res => {
            setData(res.result);
        });
    }, []);

    if (!data) {
        return (
            <div className={styles.private}>
                aaa
            </div>
        )
    }

    return (
        <div className={styles.private}>
            <Carousel autoplay>
                {getSlideData(data)}
            </Carousel>
        </div>
    );
};

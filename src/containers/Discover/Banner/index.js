import React, { useState, useEffect } from 'react';
import { getBanners } from '@/api';
import Slide from '@/components/Slide';
import styles from './index.module.less';

function getSlides(data) {
    return data.map(item => (
        <div className={styles.imgWrapper} key={item.imageUrl}>
            <img src={item.imageUrl} alt={item.typeTitle} />
        </div>
    ))
}

export default () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        getBanners().then(res => {
            setData(res.banners)
        })
    }, [])

    if (!data) {
        return (
            <div className={styles.banner}>
            </div>
        )
    }

    return (
        <div className={styles.banner}>
            <Slide>
                { getSlides(data) }
            </Slide>
        </div>
    );
};

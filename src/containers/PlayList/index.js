import React, { useState, useEffect } from 'react';
import { getPlayList } from '@/api';
import Tab from '@/components/Tab';
import Head from './Head';
import List from './List';
import Comment from './Comment';

import styles from './index.module.less';

export default (props) => {
    const [data, setData] = useState(null);
    const { match: { params: { id } } } = props;
    
    useEffect(() => {
        getPlayList({ id }).then(res => {
            if (res) {
                setData(res.playlist)
            }
        })
    }, [])

    if (!data) {
        return (
            <div>
                aa
            </div>
        )
    }

    return (
        <div>
            <Head data={data} />
            <Tab />
        </div>
    )
}
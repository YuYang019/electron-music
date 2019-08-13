import React, { useState, useEffect } from 'react';
import { getPlayList } from '@/api';
import Tab from '@/components/Tab';
import Head from './Head';
import List from './List';
import Comment from './Comment';

import styles from './index.module.less';

const { Tabs, TabPane } = Tab;

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

    function handleChange() {}

    return (
        <div className={styles.playlist}>
            <Head data={data} />
            <Tabs defaultKey="1" onChange={handleChange}>
                <TabPane tabKey="1" tab="歌曲列表">
                    <List data={data} />
                </TabPane>
                <TabPane tabKey="2" tab={() => (
                    <div>
                        评论
                        <span style={{fontSize: 12}}>({data.commentCount})</span>
                    </div>
                )}>
                    <Comment />
                </TabPane>
            </Tabs>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import styles from './index.module.less';

// let lyr = null

export default props => {
    const { visible, setVisible, curLyric, lrcRunner } = props;

    if (!lrcRunner) {
        return (<div></div>)
    }
    
    function handleClose() {
        console.log('close11')
        setVisible(false);
    }

    function getLyrics() {
        const lyrics = lrcRunner.getLyrics()
        const curIndex = lrcRunner.curIndex()
        return lyrics.map((item, index) => {
            return (<p className={index === curIndex ? styles.curLyric : ''} key={index}>{item.content}</p>)
        })
    }

    return (
        <div className={styles.lyric}>
            <Drawer
                mask={false}
                bodyStyle={{ height: 'calc(100vh)', overflowY: 'auto', paddingBottom: '100px' }}
                height={{ height: 'calc(100vh)' }}
                placement={'bottom'}
                closable={true}
                onClose={handleClose}
                visible={visible}
            >
                {curLyric && curLyric.content}
                {getLyrics()}
            </Drawer>
        </div>
    );
};

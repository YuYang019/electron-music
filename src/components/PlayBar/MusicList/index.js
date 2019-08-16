import React, { useState, useEffect } from 'react';
import { Icon, Popover, Drawer } from 'antd';
import classNames from 'classnames';
import Table from '@/components/Table';
import { getAuthor, getDuration } from '@/utils';
import styles from './index.module.less';

export default props => {
    const { tipVisible, list, curMusic, musicIndex } = props;
    const [visible, setVisible] = useState(false);
    const [listDOM, setListDOM] = useState(null);

    function handleClick() {
        setVisible(true);
    }

    function onClose() {
        setVisible(false);
    }

    useEffect(() => {
        if (visible && listDOM && musicIndex) {
            console.log(musicIndex)
            const scrollTop = 35 * musicIndex;
            listDOM.scrollTop = scrollTop;
        }
    }, [visible, listDOM, musicIndex])

    const colums = [
        {
            render: row => (
                <span className={styles.name} key={1}>
                    <span>{row.name}</span>
                </span>
            )
        },
        {
            render: row => (
                <span key={2} className={styles.author}>
                    {getAuthor(row.ar)}
                </span>
            )
        },
        {
            render: row => (
                <span key={3} className={styles.duration}>
                    {getDuration(row.dt)}
                </span>
            )
        }
    ];

    function handleItemClick() {}
    function handleDoubleClick() {}

    const rowClassName = (row, rowIndex) => {
        const classnames = classNames({
            [styles.active]: curMusic && row.id === curMusic.id
        });
        return classnames;
    };

    return (
        <span>
            <Popover
                overlayClassName={styles.popover}
                visible={tipVisible}
                content={'已开始播放'}
            >
                <Icon onClick={handleClick} type='menu-fold' />
            </Popover>
            <Drawer
                width={450}
                placement='right'
                closable={false}
                onClose={onClose}
                visible={visible}
                maskStyle={{ background: 'transparent' }}
                className={styles.drawer}
                bodyStyle={{ padding: '0', height: '100%' }}
            >
                <div className={styles.musicList}>
                    <div className={styles.headWrapper}>
                        <div className={styles.tags}>
                            <span>播放列表</span>
                            &nbsp;&nbsp;/&nbsp;&nbsp;
                            <span>历史记录</span>
                        </div>
                        <div className={styles.head}>
                            <span>共{list.length}首</span>
                            <span>
                                <span>
                                    <Icon type='folder-add' />
                                    收藏全部
                                </span>
                                <span>
                                    <Icon type='delete' />
                                    清空
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className={styles.listWrapper} ref={node => setListDOM(node)}>
                        <Table
                            onRow={{
                                onClick: (event, row, rowIndex) => {
                                    handleItemClick(rowIndex);
                                },
                                onDoubleClick: (event, row, rowIndex) => {
                                    handleDoubleClick(row);
                                }
                            }}
                            rowClassName={rowClassName}
                            dataSource={list}
                            colums={colums}
                        />
                    </div>
                </div>
            </Drawer>
        </span>
    );
};

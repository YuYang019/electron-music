import React, { useState } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MusicIcon from '@/components/MusicIcon';
import Table from '@/components/Table';
import { getDuration, getAuthor } from '@/utils';
import * as PlayerAction from '@/actions/player';
import { checkMusic } from '@/api';

import styles from './index.module.less';

const remote = window.require('electron').remote;

const { Menu, MenuItem } = remote;

function getIndex(index) {
    index = +index + 1;
    if (index < 10) {
        index = `0${index}`;
    }
    return index;
}

const List = props => {
    const {
        data: { tracks },
        getMusic,
        player
    } = props;
    const [curIndex, setIndex] = useState(null);

    const { status, data } = player;

    function handleItemClick(index) {
        setIndex(index);
    }

    function handleMenuClick(item) {
        const menu = new Menu();
        menu.append(
            new MenuItem({
                label: '播放',
                click() {
                    handleDoubleClick(item);
                }
            })
        );
        menu.append(new MenuItem({ label: `查看评论` }));
        menu.append(new MenuItem({ label: '下一首播放' }));
        menu.popup({ window: remote.getCurrentWindow() });
    }

    function handleDoubleClick(item) {
        getMusic(item, tracks, curIndex)
    }

    const colums = [
        {
            render: (row, index) => (
                <span className={styles.index} key={0}>
                    {data && row.id === data.id ? (
                        <MusicIcon
                            className={styles.musicIcon}
                            stop={status !== 1}
                        />
                    ) : (
                        getIndex(index)
                    )}
                </span>
            )
        },
        {
            render: row => (
                <span className={styles.name} key={1}>
                    <span>{row.name}</span>
                    <Icon
                        onClick={() => handleMenuClick(row)}
                        type='ellipsis'
                    />
                </span>
            )
        },
        {
            render: row => <span key={2} className={styles.author}>{getAuthor(row.ar)}</span>
        },
        {
            render: row => <span key={3} className={styles.alblum}>{row.al.name}</span>
        },
        {
            render: row => <span key={4} className={styles.duration}>{getDuration(row.dt)}</span>
        }
    ];

    const rowClassName = (row, rowIndex) => {
        const classnames = classNames({
            [styles.clicked]: rowIndex === curIndex,
            [styles.active]: data && row.id === data.id
        });
        return classnames;
    };

    return (
        <div className={styles.list}>
            <div className={styles.title}>
                <span>音乐标题</span>
                <span>歌手</span>
                <span>专辑</span>
                <span>时长</span>
            </div>
            <Table
                onRow={{
                    onClick: (event, row, rowIndex) => { handleItemClick(rowIndex) },
                    onDoubleClick: (event, row, rowIndex) => { handleDoubleClick(row) }
                }}
                rowClassName={rowClassName}
                dataSource={tracks}
                colums={colums}
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        player: state.player
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(PlayerAction, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

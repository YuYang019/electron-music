import React, { useState } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MusicIcon from '@/components/MusicIcon';
import { getDuration } from '@/utils';
import * as PlayerAction from '@/actions/player';
import { checkMusic } from '@/api';

import styles from './index.module.less';

const remote = window.require('electron').remote;

const { Menu, MenuItem } = remote;

function getAuthor(authors) {
    let result = '';
    for (let i = 0; i < authors.length; i++) {
        result += authors[i].name + ' / ';
    }
    return result.slice(0, -3);
}

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

    const { status, data } = player

    function handleItemClick(index) {
        setIndex(index);
    }

    function handleMenuClick(item) {
        const menu = new Menu();
        menu.append(new MenuItem({ label: '播放', click() { handleDoubleClick(item) } }));
        menu.append(new MenuItem({ label: `查看评论` }));
        menu.append(new MenuItem({ label: '下一首播放' }));
        menu.popup({ window: remote.getCurrentWindow() });
    }

    function handleDoubleClick(item) {
        const { id } = item;
        checkMusic({ id }).then(res => {
            if (res.success === true) {
                getMusic(id, item)
            }
        });
    }

    return (
        <div>
            <div className={styles.title}>
                <span>音乐标题</span>
                <span>歌手</span>
                <span>专辑</span>
                <span>时长</span>
            </div>
            <ul className={styles.listWrapper}>
                {tracks.map((item, index) => {
                    const classnames = classNames(styles.item, {
                        [styles.odd]: index % 2 === 0,
                        [styles.clicked]: index === curIndex,
                        [styles.active]: data && (item.id === data.id)
                    });
                    return (
                        <li
                            className={classnames}
                            key={item.id}
                            onDoubleClick={() => handleDoubleClick(item)}
                            onClick={() => handleItemClick(index)}
                        >
                            <span>
                                {data && item.id === data.id ? (
                                    <MusicIcon
                                        className={styles.musicIcon}
                                        stop={status !== 1}
                                    />
                                ) : (
                                    getIndex(index)
                                )}
                            </span>
                            <span>
                                <span>{item.name}</span>
                                <Icon
                                    onClick={() => handleMenuClick(item)}
                                    type='ellipsis'
                                />
                            </span>
                            <span>{getAuthor(item.ar)}</span>
                            <span>{item.al.name}</span>
                            <span>{getDuration(item.dt)}</span>
                        </li>
                    );
                })}
            </ul>
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

import React, { useState } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import MusicIcon from '@/components/MusicIcon';
import { getDuration } from '@/utils';
import styles from './index.module.less';

const remote = window.require('electron').remote;

const { Menu, MenuItem } = remote;

const menu = new Menu();
menu.append(new MenuItem({ label: '播放', click() {} }));
menu.append(new MenuItem({ label: `查看评论` }));
menu.append(new MenuItem({ label: '下一首播放' }));

export default props => {
    const {
        data: { tracks }
    } = props;
    const [curIndex, setIndex] = useState(null);
    const [curPlayIndex, setPlayIndex] = useState(null);
    const [stop, setStop] = useState(false);
    const [play, setPlay] = useState(false);

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

    function handleItemClick(index) {
        setIndex(index);
    }

    function handleMenuClick(id) {
        console.log(id);
        menu.popup({ window: remote.getCurrentWindow() });
    }

    function handleDoubleClick(item, index) {
        console.log(item);
        setPlayIndex(index);
        setPlay(true);
        setStop(false);
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
                        [styles.active]: play && index === curPlayIndex
                    });
                    return (
                        <li
                            className={classnames}
                            key={item.id}
                            onDoubleClick={() => handleDoubleClick(item, index)}
                            onClick={() => handleItemClick(index)}
                        >
                            <span>
                                {play && index === curPlayIndex ? (
                                    <MusicIcon
                                        className={styles.musicIcon}
                                        stop={stop}
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

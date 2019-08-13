import React, { useState } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import MusicIcon from '@/components/MusicIcon'
import styles from './index.module.less';

const remote = window.require('electron').remote;

const { Menu, MenuItem } = remote;

const menu = new Menu()
menu.append(new MenuItem({ label: '播放', click() {} }));
menu.append(new MenuItem({ label: `查看评论` }));
menu.append(new MenuItem({ label: '下一首播放' }));

export default props => {
    const {
        data: { tracks }
    } = props;
    const [curIndex, setIndex] = useState(null);
    const [stop, setStop] = useState(false);
    const [play, setPlay] = useState(false);

    function getAuthor(authors) {
        let result = ''
        for (let i = 0; i < authors.length; i++) {
            result += authors[i].name + ' / '
        }
        return result.slice(0, -3)
    }

    function getDuration(duration) {
        duration = +duration;
        let minute = Math.floor(duration / (60 * 1000));
        let second = Math.round((duration % (60 * 1000)) / 1000);

        if (minute < 10) {
            minute = `0${minute}`;
        }
        if (second < 10) {
            second = `0${second}`;
        }
        return `${minute}:${second}`;
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
        setPlay(true)
        setStop(false)
    }

    function handleMenuClick(id) {
        console.log(id)
        menu.popup({ window: remote.getCurrentWindow() })
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
                        [styles.active]: index === curIndex
                    })
                    return (
                        <li className={classnames} key={item.id} onClick={() => handleItemClick(index)}>
                            <span>
                                {
                                    (play && index === curIndex) ? <MusicIcon className={styles.musicIcon} stop={stop} /> : getIndex(index)
                                }
                            </span>
                            <span>
                                <span>{item.name}</span>
                                <Icon onClick={() => handleMenuClick(item)} type="ellipsis" />
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

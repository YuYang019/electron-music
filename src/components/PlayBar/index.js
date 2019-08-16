import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import * as PlayerAction from '@/actions/player';
import { getDuration } from '@/utils';
import Volume from './Volume';
import MusicList from './MusicList';

import styles from './index.module.less';

const PlayBar = props => {
    const {
        startMusic,
        pauseMusic,
        endMusic,
        player: { status, data, musicList, musicIndex }
    } = props;
    const [audio, setAudioDOM] = useState(null);
    const [tipVisible, setTipVisible] = useState(false);
    const [volume, setVolume] = useState(50);
    const [time, setTime] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (audio) {
            audio.volume = volume / 100;
            audio.onplaying = () => {
                console.log(1);
                startMusic();
            };
            audio.onpause = () => {
                pauseMusic();
            };
            audio.ontimeupdate = () => {
                setTime(audio.currentTime);
                setWidth(450 * (audio.currentTime / audio.duration));
            };
            audio.onended = () => {
                endMusic();
            };
        }
    }, [audio, pauseMusic, startMusic, endMusic, volume]);

    useEffect(() => {
        if (data) {
            setTipVisible(true);
            setTimeout(() => {
                setTipVisible(false);
            }, 2000);
        }
    }, [data]);

    if (!data) {
        return <div className={styles.playBar} />;
    }

    function handlePlay() {
        audio.play();
    }
    function handlePause() {
        audio.pause();
    }
    function handleClickProgress(e) {
        const offset = e.pageX - 327;
        const percent = offset / 450;
        audio.currentTime = audio.duration * percent;
        setWidth(450 * percent);
        setTime(audio.duration * percent);
    }

    const { url, detail } = data;
    return (
        <div className={styles.playBar}>
            <audio
                style={{ display: 'none' }}
                ref={node => setAudioDOM(node)}
                autoPlay
                src={url}
            />
            <div className={styles.left}>
                <div>
                    <span>
                        <Icon type='step-backward' />
                    </span>
                    <span>
                        {status === 1 ? (
                            <Icon onClick={handlePause} type='pause-circle' />
                        ) : (
                            <Icon onClick={handlePlay} type='play-circle' />
                        )}
                    </span>
                    <span>
                        <Icon type='step-forward' />
                    </span>
                </div>
            </div>
            {}
            <div className={styles.mid}>
                <div className={styles.img}>
                    <img src={detail.al.picUrl} alt={detail.al.name} />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>
                        <span>
                            <span>{detail.name} - </span>
                            <span className={styles.album}>
                                {detail.al.name}
                            </span>
                        </span>
                        <span>
                            {getDuration(time, 's')} / {getDuration(detail.dt)}
                        </span>
                    </div>
                    <div
                        className={styles.progressWrapper}
                        onClick={handleClickProgress}
                    >
                        <div className={styles.progress} />
                        <div
                            style={{ width: !!width ? width : 0 }}
                            className={styles.curProgress}
                        >
                            <div className={styles.ball} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.rightIcon}>
                    <Icon type='retweet' />
                    <MusicList musicIndex={musicIndex} curMusic={data} list={musicList} tipVisible={tipVisible} />
                    <Volume vol={volume} setVol={setVolume} />
                </div>
            </div>
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
)(PlayBar);

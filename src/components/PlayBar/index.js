import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Popover } from 'antd';
import * as PlayerAction from '@/actions/player';
import { getDuration } from '@/utils';
import styles from './index.module.less';

const PlayBar = props => {
    const {
        startMusic,
        pauseMusic,
        player: { status, data }
    } = props;
    const [audio, setAudioDOM] = useState(null);
    const [time, setTime] = useState(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (audio) {
            audio.onplaying = () => {
                console.log(1);
                startMusic();
            };
            audio.onpause = () => {
                pauseMusic();
            };
            audio.ontimeupdate = () => {
                setTime(audio.currentTime)
                setWidth(450 * (audio.currentTime / audio.duration))
            };
        }
    }, [audio, pauseMusic, startMusic]);

    if (!data) {
        return <div className={styles.playBar} />;
    }

    const progressStyle = {
      width
    }

    function handlePlay() {
        audio.play();
    }
    function handlePause() {
        audio.pause();
    }

    const { url, detail } = data;

    const soundContent = <div>aaaa</div>;

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
                        <span>{getDuration(time, 's')} / {getDuration(detail.dt)}</span>
                    </div>
                    <div className={styles.progressWrapper}>
                        <div className={styles.progress} />
                        <div style={progressStyle} className={styles.curProgress} />
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.rightIcon}>
                    <Icon type='retweet' />
                    <Icon type='menu-fold' />
                    <Popover content={soundContent}>
                        <Icon type='sound' />
                    </Popover>
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

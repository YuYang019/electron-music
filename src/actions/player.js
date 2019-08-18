import { getMusicUrl, checkMusic, getLyric } from '../api';
import { notification } from 'antd';

notification.config({
    top: 65,
    duration: 2,
});

export const PLAYER_DATA = 'PLAYER_DATA';
export const PLAYER_START = 'PLAYER_START';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_END = 'PLAYER_END';
export const PLAYER_CLEAR = 'PLAYER_CLEAR';

function getAction(type, payload) {
    return {
        type,
        payload
    };
}

export function getMusic(music, musicList, musicIndex) {
    return (dispatch, getState) => {
        return checkMusic({ id: music.id })
            .then(res => {
                if (!res.success) {
                    notification.error({
                        message: res.message || '亲爱的，暂无版权'
                    });
                    return;
                }
                getMusicUrl({ id: music.id }).then(res => {
                    if (res.data && res.data.length) {
                        if (!res.data[0].url) {
                            notification.error({ message: '当前歌曲暂无资源' });
                            return;
                        }
                        const data = { detail: music, ...res.data[0] };
                        dispatch(
                            getAction(PLAYER_DATA, {
                                data,
                                musicList: musicList ? musicList : [music],
                                musicIndex
                            })
                        );
                    }
                });
                getLyric({ id: music.id }).then(data => {
                    console.log(data);
                    dispatch(getAction(PLAYER_DATA, { lyric: data }))
                })
            })
            .catch(err => {
                notification.error({
                    message: '亲爱的，暂无版权'
                });
                dispatch(getAction(PLAYER_DATA, { musicIndex }))
                return false;
            });
    };
}

export function clearMusic() {
    return (dispatch, getState) => {
        dispatch(getAction(PLAYER_CLEAR));
    };
}

export function pauseMusic(id) {
    return (dispatch, getState) => {
        dispatch(getAction(PLAYER_PAUSE));
    };
}

export function endMusic(id) {
    return (dispatch, getState) => {
        dispatch(getAction(PLAYER_END));
    };
}

export function startMusic(id) {
    return (dispatch, getState) => {
        dispatch(getAction(PLAYER_START));
    };
}

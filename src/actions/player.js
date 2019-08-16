import { getMusicUrl } from '../api';

export const PLAYER_DATA = 'PLAYER_DATA';
export const PLAYER_START = 'PLAYER_START';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_END = 'PLAYER_END';

function getAction(type, payload) {
    return {
        type,
        payload
    };
}

export function getMusic(music, musicList, musicIndex) {
    return (dispatch, getState) => {
        return getMusicUrl({ id: music.id }).then(res => {
            if (res.data && res.data.length) {
                if (!res.data[0].url) {
                    res.data[0].url = `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
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

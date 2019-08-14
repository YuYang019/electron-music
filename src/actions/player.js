import { getMusicUrl } from '../api';

export const PLAYER_DATA = 'PLAYER_DATA';
export const PLAYER_START = 'PLAYER_START';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_EMPTY = 'PLAYER_EMPTY';

function getAction(type, payload) {
    return {
        type,
        payload
    };
}

export function getMusic(id, music) {
    return (dispatch, getState) => {
        return getMusicUrl({ id }).then(res => {
            if (res.data && res.data.length) {
                const data = { detail: music, ...res.data[0] }
                dispatch(getAction(PLAYER_DATA, { data }));
            }
        })
    };
}

export function pauseMusic(id) {
    return (dispatch, getState) => {
        dispatch(getAction(PLAYER_PAUSE));
    };
}

export function emptyMusic(id) {
    return (dispatch, getState) => {
        dispatch(getAction(PLAYER_EMPTY));
    };
}

export function startMusic(id) {
    return (dispatch, getState) => {
        dispatch(getAction(PLAYER_START));
    };
}


import { PLAYER_DATA, PLAYER_START, PLAYER_PAUSE, PLAYER_END } from '@/actions/player';

const playerState = {
    data: null,
    status: 0, // 0 未播放，1 播放中，2 暂停
    musicList: [],
    musicIndex: null,
}

export default (state = playerState, action) => {
  switch (action.type) {
    case PLAYER_DATA:
      return state = { ...state, ...action.payload }
    case PLAYER_START:
      return state = { ...state, status: 1 };
    case PLAYER_PAUSE:
      return state = { ...state, status: 2 };
    case PLAYER_END:
      return state = { ...state, status: 0 };
    default:
      return state;
  }
}

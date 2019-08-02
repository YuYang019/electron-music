import { USER_LOGIN } from '@/actions/user';

const userState = null

export default function login(state = userState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return state = { ...state, ...action.payload };
    default:
      return state;
  }
}

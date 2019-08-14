import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import user from './user';
import player from './player';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    user,
    player
  });
}

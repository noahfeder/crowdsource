import { combineReducers } from 'redux';
import { REQUEST_BINARIES, RECEIVE_BINARIES } from '../actions/actions';
import scene from './scene';

function binaries(state = {
  isFetching: false,
  items: []
  }, action) {
    switch (action.type) {
      case REQUEST_BINARIES:
        return Object.assign({}, state, {
          isFetching: true
        })
      case RECEIVE_BINARIES:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.data,
          lastUpdated: action.receivedAt
        })
      default:
        return state;
    }
}


const RootReducer = combineReducers({
  binaries,
  scene: scene
});

export default RootReducer;

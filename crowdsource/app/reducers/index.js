import { combineReducers } from 'redux';
import Decisions from "./decisions"
import { REQUEST_BINARIES, RECEIVE_BINARIES } from '../actions/actions';

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
        return state
    }
}


const RootReducer = combineReducers({
  binaries
});

export default RootReducer;

import { combineReducers } from 'redux';
import { REQUEST_BINARIES, RECEIVE_BINARIES, REQUEST_BINARY, RECEIVE_BINARY, VOTING, VOTED } from '../actions/actions';

function binaries(state = {
  isFetching: false,
  items: {}
  }, action) {
    switch (action.type) {
      case REQUEST_BINARIES:
        return Object.assign({}, state, {
          isFetching: true
        })
      case RECEIVE_BINARIES: {
        let newObj = {};
        action.data.forEach( (el) => {
          newObj[el.id] = el;
          newObj[el.id]["lastUpdated"] = action.receivedAt;
        })
        return Object.assign({}, state, {
          isFetching: false,
          items: newObj,
        })
      }
      case REQUEST_BINARY:
        return Object.assign({}, state, {
          isFetching: true,
          currentlyFetching: action.id
        })
      case RECEIVE_BINARY: {
        let newObj = {
          isFetching: false,
          currentlyFetching: null,
          items: {}
        };
        newObj.items[action.id] = action.data;
        newObj.items[action.id]["lastUpdated"] = Date.now();
        return Object.assign({},state, newObj)
      }
      case VOTING:
        return Object.assign({},state,{
          currentlyFetching: action.id,
          isFetching: true
        })
      case VOTED: {
        let newObj = {
          isFetching: false,
          currentlyFetching: null,
          items: {}
        };
        newObj.items[action.id] = action.data;
        newObj.items[action.id]["lastUpdated"] = Date.now();
        return Object.assign({},state, newObj);
      }
      default:
        return state;
    }
}

const RootReducer = combineReducers({
  binaries
});

export default RootReducer;

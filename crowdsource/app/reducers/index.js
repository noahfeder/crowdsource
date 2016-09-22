import { combineReducers } from 'redux';
import { REQUEST_BINARIES, RECEIVE_BINARIES, REQUEST_BINARY, RECEIVE_BINARY, VOTING, VOTED } from '../actions/actions';

function activeBinary(state = {
  isFetching: false,
  currentlyFetching: null,
  data: null
  }, action) {
    switch (action.type) {
      case REQUEST_BINARY: case VOTING: {
        return Object.assign({}, state, {
          isFetching: true,
          currentlyFetching: action.id
        });
      }
      case RECEIVE_BINARY: case VOTED: {
        return Object.assign({},state, {
          isFetching: false,
          currentlyFetching: null,
          data: action.data
        });
      }
      default:
        return state;
    }
}

function binaries(state = {
  isFetching: false,
  currentlyFetching: null,
  items: {}
  }, action) {
    switch (action.type) {
      case REQUEST_BINARIES: {
        return Object.assign({}, state, {
          isFetching: true,
          currentlyFetching: -1
        })
      }
      case RECEIVE_BINARIES: {
        let newObj = {};
        action.data.forEach( (el) => {
          newObj[el.id] = el;
          newObj[el.id]["lastUpdated"] = action.receivedAt;
        })
        return Object.assign({}, state, {
          isFetching: false,
          currentlyFetching: null,
          items: newObj
        })
      }
      default:
        return state;
    }
}

const RootReducer = combineReducers({
  binaries,
  activeBinary
});

export default RootReducer;
const dead = `case REQUEST_BINARY:
        return Object.assign({}, state, {
          isFetching: true,
          currentlyFetching: action.id
        });
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
          isFetching: true,
          currentlyFetching: action.id
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
      }`

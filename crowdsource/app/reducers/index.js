import { combineReducers } from 'redux';
import { REQUEST_BINARIES, RECEIVE_BINARIES, REQUEST_BINARY, RECEIVE_BINARY, VOTING, VOTED, LOGGING_IN, LOGGED_IN, TOGGLE_MENU } from '../actions/actions';

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
        return Object.assign({}, state, {
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


function user(state = {}, action) {
  switch (action.type) {
    case LOGGING_IN: case LOGGED_IN:
      return Object.assign({},state, {
        id: action.id,
        loggedIn: action.loggedIn
      });
    default:
      return state;
  }
}

function toggleMenu(state = {toggle: false}, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return Object.assign({}, state, {
          toggle: !state.toggle
      });
    default:
      return state;
  }
}

const RootReducer = combineReducers({
  binaries,
  activeBinary,
  user,
  toggleMenu
});

export default RootReducer;

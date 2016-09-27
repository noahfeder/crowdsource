'use strict';
import { combineReducers } from 'redux';

import {
  REQUEST_BINARIES, RECEIVE_BINARIES, UPDATE_BINARIES,
  REQUEST_BINARY, RECEIVE_BINARY, UPDATE_BINARY, CREATE_BINARY,
  REQUEST_USER_BINARIES, RECEIVE_USER_BINARIES,
  UPDATE_USER_BINARIES, USER_BINARIES_FAILED,
  VOTING, VOTED, VOTE_FAILED,
  LOGGING_IN_LOCAL, LOGGING_IN_REMOTE, LOGGED_IN, USER_ERROR,
  TOGGLE_MENU, HIDE_MENU
} from '../actions/actions';

function userBinaries(state = {
  isFetching: true,
  items: null,
  error: false,
  currentlyFetching: null
  }, action) {
    switch (action.type) {
      case REQUEST_USER_BINARIES: {
        return Object.assign({}, state, {
          isFetching: true,
          currentlyFetching: action.user_id
        });
      }
      case UPDATE_USER_BINARIES: {
        return Object.assign({}, state, {
          isFetching: false,
          currentlyFetching: action.user_id
        });
      }
      case RECEIVE_USER_BINARIES: {
        return Object.assign({}, state, {
          error: false,
          isFetching: false,
          currentlyFetching: null,
          items: action.data
        })
      }
      case USER_BINARIES_FAILED: {
        return Object.assign({}, state, {
          isFetching: false,
          currentlyFetching: null,
          items: null,
          error: true,
          message: action.data.message
        })
      }
      default:
        return state;
    }
}

function activeBinary(state = {
  isFetching: false,
  currentlyFetching: null,
  data: null,
  error: false,
  message: null,
  creating: false
}, action) {
  switch (action.type) {
    case REQUEST_BINARY: case VOTING: {
      return Object.assign({}, state, {
        isFetching: true,
        currentlyFetching: action.binary_id
      });
    }
    case RECEIVE_BINARY: case VOTED: {
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        message: null,
        currentlyFetching: null,
        data: action.data,
        creating: false
      });
    }
    case UPDATE_BINARY: {
      return Object.assign({}, state, {
        isFetching: false,
        currentlyFetching: null,
        data: action.data
      });
    }
    case CREATE_BINARY: {
      return Object.assign({}, state, {
        isFetching: false,
        currentlyFetching: null,
        data: null,
        creating: true
      })
    }
    case VOTE_FAILED: {
      return Object.assign({}, state, {
        isFetching: false,
        currentlyFetching: null,
        error: true,
        message: action.data.message,
        creating: false
      })
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
    case UPDATE_BINARIES: {
      return Object.assign({}, state, {
        isFetching: false,
        currentlyFetching: -1
      })
    }
    case RECEIVE_BINARIES: {
      let newObj = {};
      action.data.forEach( (el) => {
        newObj[el.id] = el;
        newObj[el.id]['lastUpdated'] = action.receivedAt;
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
    case LOGGING_IN_LOCAL: {
      return Object.assign({}, state, {
        id: action.id,
        name: action.name,
        loggedIn: action.loggedIn,
        error: false,
        message: null,
        working: action.working
      });
    }
    case LOGGING_IN_REMOTE: {
      return Object.assign({}, state, {
        id: null,
        name: action.name,
        loggedIn: action.loggedIn,
        error: false,
        message: null,
        working: action.working
      });
    }
    case LOGGED_IN: {
      return Object.assign({},state, {
        id: action.id,
        name: action.name,
        loggedIn: action.loggedIn,
        error: false,
        message: null,
        working: action.working
      });
    }
    case USER_ERROR: {
      return Object.assign({}, state, {
        id: null,
        name: null,
        loggedIn: action.loggedIn,
        error: action.error,
        message: action.message,
        working: action.working
      })
    }
    default:
      return state;
  }
}

function toggleMenu(state = { toggle: false }, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        toggle: !state.toggle
      });
    case HIDE_MENU:
      return Object.assign({}, state, {
        toggle: false
      })
    default:
      return state;
  }
}

const RootReducer = combineReducers({
  binaries,
  activeBinary,
  userBinaries,
  user,
  toggleMenu
});

export default RootReducer;

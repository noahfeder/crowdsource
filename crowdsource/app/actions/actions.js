export const REQUEST_BINARIES = 'REQUEST_BINARIES';

export function requestBinaries() {
  return {
    type: REQUEST_BINARIES
  }
}

export const RECEIVE_BINARIES = 'RECEIVE_BINARIES'

export function receiveBinaries(data) {
  return {
    type: RECEIVE_BINARIES,
    data: data,
    receivedAt: Math.floor(Date.now() / 1000)
  }
}

export function fetchBinaries() {
  return function(dispatch) {
    dispatch(requestBinaries());
    return fetch('https://f2ba03b6.ngrok.io/')
      .then(response => response.json())
      .then(json => dispatch(receiveBinaries(json)));
  }
}

export const UPDATE_BINARIES = 'UPDATE_BINARIES';

export function updateBinaries() {
  return {
    type: UPDATE_BINARIES
  }
}

export function refreshBinaries() {
  return function(dispatch) {
    dispatch(updateBinaries());
    return fetch('https://f2ba03b6.ngrok.io/')
      .then(response => response.json())
      .then(json => dispatch(receiveBinaries(json)));
  }
}


export const REQUEST_BINARY = 'REQUEST_BINARY';

export function requestBinary(id) {
  return {
    type: REQUEST_BINARY,
    binary_id: id
  }
}

export const RECEIVE_BINARY = 'RECEIVE_BINARY';

export function receiveBinary(json, id) {
  return {
    type: RECEIVE_BINARY,
    binary_id: id,
    data: json,
    receivedAt: Math.floor(Date.now() / 1000)
  }
}

export const UPDATE_BINARY = 'UPDATE_BINARY';

export function updateBinary(json, id) {
  return {
    type: UPDATE_BINARY,
    binary_id: id,
    data: json,
    receivedAt: Math.floor(Date.now() / 1000)
  }
}

export function refreshBinary(id) {
  return function(dispatch) {
    dispatch(requestBinary(id));
    return fetch(`https://f2ba03b6.ngrok.io/binaries/${id}`)
      .then(response => response.json())
      .then(json => dispatch(updateBinary(json, id)))
  }
}

export function fetchBinary(id) {
  return function(dispatch) {
    dispatch(requestBinary(id));
    return fetch(`https://f2ba03b6.ngrok.io/binaries/${id}`)
      .then(response => response.json())
      .then(json => dispatch(receiveBinary(json, id)))
  }
}

export const VOTING = 'VOTING';

export function sendVote(binary_id, choice, user_id) {
  return {
    type: VOTING,
    binary_id: binary_id,
    choice: choice,
    user_id: user_id
  }
}

export const VOTED = 'VOTED';

export function confirmedVote(binary_id, choice, json) {
  return {
    type: VOTED,
    binary_id: binary_id,
    choice: choice,
    data: json
  }
}

export const VOTE_FAILED = 'VOTE_FAILED';

export function failedVote(json) {
  return {
    type: VOTE_FAILED,
    id: null,
    choice: null,
    user_id: null,
    data: json
  }
}

export function vote(binary_id, choice, user_id) {
  return function(dispatch) {
    dispatch(sendVote(binary_id, choice, user_id));
    let dataToSend = JSON.stringify({
      choice: choice,
      user_id: user_id
    })
    return fetch(`https://f2ba03b6.ngrok.io/binaries/${binary_id}`, {
      method: 'PATCH',
      body: dataToSend
    })
    .then( response => response.json() )
    .then( json => {
      if (json.error) {
        dispatch(failedVote(json));
      } else {
        dispatch(confirmedVote(binary_id, choice, json));
      }
    })
  }
}

export const LOGGING_IN = 'LOGGING_IN';

export function loggingIn(id, name) {
  return {
    type: LOGGING_IN,
    id: id,
    name: name,
    loggedIn: false
  }
}

export const LOGGED_IN = 'LOGGED_IN';

export function loggedIn(id, name) {
  return {
    type: LOGGED_IN,
    id: id,
    name: name,
    loggedIn: true
  }
}

export const USER_ERROR = 'USER_ERROR'

export function userError(response) {
  return {
    type: USER_ERROR,
    loggedIn: false,
    error: response.error,
    message: response.message
  }
}

export function alertUserError(response) {
  return function(dispatch) {
    return dispatch(userError(response))
  }
}

export function logInUser(id, name) {
  return function(dispatch) {
    dispatch(loggingIn(id, name));
    return dispatch(loggedIn(id, name))
  }
}

export const TOGGLE_MENU = 'TOGGLE_MENU'

export function toggler() {
  return {
    type: TOGGLE_MENU
  }
}
export function toggleMenu() {
  return function(dispatch) {
    return dispatch(toggler());
  }
}

export const HIDE_MENU = 'HIDE_MENU';

export function hider() {
  return {
    type: HIDE_MENU
  }
}

export function hideMenu() {
  return function(dispatch) {
    return dispatch(hider());
  }
}
export const REQUEST_USER_BINARIES = 'REQUEST_USER_BINARIES';

export function requestUserBinaries(user_id) {
  return {
    type: REQUEST_USER_BINARIES,
    user_id: user_id
  }
}

export const UPDATE_USER_BINARIES = 'UPDATE_USER_BINARIES';

export function updateUserBinaries(user_id) {
  return {
    type: UPDATE_USER_BINARIES,
    user_id: user_id
  }
}

export const RECEIVE_USER_BINARIES = 'RECEIVE_USER_BINARIES';

export function receiveUserBinaries(user_id, data) {
  return {
    type: RECEIVE_USER_BINARIES,
    user_id: user_id,
    data: data
  }
}

export const USER_BINARIES_FAILED = 'USER_BINARIES_FAILED';

export function userBinariesFailed(user_id, data) {
  return {
    type: USER_BINARIES_FAILED,
    user_id: user_id,
    data: data
  }
}
export function fetchUserBinaries(user_id) {
  return function(dispatch) {
    dispatch(requestUserBinaries(user_id));
    return fetch(`https://f2ba03b6.ngrok.io/user/${user_id}`)
      .then( response => response.json() )
      .then( json => {
        if (json.error) {
          dispatch(userBinariesFailed(user_id, json));
        } else {
          dispatch(receiveUserBinaries(user_id, json));
        }
      });
  }
}

export function refreshUserBinaries(user_id) {
  return function(dispatch) {
    dispatch(updateUserBinaries(user_id));
    return fetch(`https://f2ba03b6.ngrok.io/user/${user_id}`)
      .then( response => response.json() )
      .then( json => {
        if (json.error) {
          dispatch(userBinariesFailed(user_id, json));
        } else {
          dispatch(receiveUserBinaries(user_id, json));
        }
      });
  }
}

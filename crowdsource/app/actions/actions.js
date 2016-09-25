export const REQUEST_BINARIES = 'REQUEST_BINARIES';

export function requestBinaries() {
  return {
    type: REQUEST_BINARIES
  }
}

export const RECEIVE_BINARIES = 'RECEIVE_BINARIES'

export function receiveBinaries(json) {
  return {
    type: RECEIVE_BINARIES,
    data: json,
    receivedAt: Date.now()
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
    id: id
  }
}

export const RECEIVE_BINARY = 'RECEIVE_BINARY'

export function receiveBinary(json, id) {
  return {
    type: RECEIVE_BINARY,
    id: id,
    data: json,
    receivedAt: Date.now()
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

export function sendVote(id, choice) {
  return {
    type: VOTING,
    id: id,
    choice: choice
  }
}

export const VOTED = 'VOTED';

export function confirmedVote(id, choice, json) {
  return {
    type: VOTED,
    id: id,
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
    data: json
  }
}

export function vote(id, choice) {
  return function(dispatch) {
    dispatch(sendVote(id, choice));
    return fetch(`https://f2ba03b6.ngrok.io/binaries/${id}?choice=${choice}`, {
      method: 'PATCH'
    })
    .then( response => response.json() )
    .then( json => {
      if (json.error) {
        dispatch(failedVote(json));
      } else {
        dispatch(confirmedVote(id, choice, json));
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

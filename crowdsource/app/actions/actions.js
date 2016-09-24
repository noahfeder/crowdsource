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

export function vote(id, choice) {
  return function(dispatch) {
    dispatch(sendVote(id, choice));
    return fetch(`https://f2ba03b6.ngrok.io/binaries/${id}?choice=${choice}`, {
      method: 'PATCH'
    })
    .then( response => response.json() )
    .then( json => dispatch(confirmedVote(id, choice, json)) )
  }
}

export const LOGGING_IN = 'LOGGING_IN';

export function loggingIn(user_id) {
  return {
    type: LOGGING_IN,
    id: user_id,
    loggedIn: false
  }
}

export const LOGGED_IN = 'LOGGED_IN';

export function loggedIn(user_id) {
  return {
    type: LOGGED_IN,
    id: user_id,
    loggedIn: true
  }
}

export function logInUser(user_id) {
  return function(dispatch) {
    dispatch(loggingIn(user_id));
    return dispatch(loggedIn(user_id))
  }
}

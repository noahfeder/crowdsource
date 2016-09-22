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
  return function (dispatch) {
    dispatch(requestBinaries());
    return fetch('https://b345028d.ngrok.io/')
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
  return function (dispatch) {
    dispatch(requestBinary(id));
    return fetch(`https://b345028d.ngrok.io/binaries/${id}`)
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
  return function (dispatch) {
    dispatch(sendVote(id, choice));
    return fetch(`https://b345028d.ngrok.io/binaries/${id}?choice=${choice}`, {
      method: 'PATCH'
    })
    .then(response => response.json())
    .then(json => dispatch(confirmedVote(id, choice, json)))
  }
}


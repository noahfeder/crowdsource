export const REQUEST_BINARIES = 'REQUEST_BINARIES';

export function requestBinaries() {
  return {
    type: REQUEST_BINARIES
  }
}

export const REQUEST_BINARY = 'REQUEST_BINARY';

export function requestBinary(id) {
  return {
    type: REQUEST_BINARY,
    id: id
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

export const RECEIVE_BINARY = 'RECEIVE_BINARY'

export function receiveBinary(json, id) {
  return {
    type: RECEIVE_BINARY,
    id: id,
    data: json,
    receivedAt: Date.now()
  }
}

export function fetchBinaries() {
  return function (dispatch) {
    dispatch(requestBinaries());
    return fetch('https://f5b1d29b.ngrok.io/')
      .then(response => response.json())
      .then(json => dispatch(receiveBinaries(json)));
  }
}
// TODO UPDATE NGROK ADDRESS
export function fetchBinary(id) {
  return function (dispatch) {
    dispatch(requestBinary(id));
    return fetch(`https://f5b1d29b.ngrok.io/${id}`)
      .then(response => response.json())
      .then(dispatch => dispatch(receiveBinary(json, id)))
  }
}

export function newScene(scene) {
  return {
   type: 'NEW_SCENE',
   payload: scene
  };
}


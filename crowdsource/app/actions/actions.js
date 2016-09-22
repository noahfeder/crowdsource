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
    return fetch('https://f5b1d29b.ngrok.io/')
      .then(response => response.json())
      .then(json => dispatch(receiveBinaries(json)));
  }
}

export function newScene(scene) {
  return {
   type: 'NEW_SCENE',
   payload: scene
  };
}


'use strict';

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
    return fetch('https://crowdsourcehelp.herokuapp.com/')
      .then( response => response.json() )
      .then( json => dispatch(receiveBinaries(json)) );
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
    return fetch('https://crowdsourcehelp.herokuapp.com/')
      .then(response => response.json())
      .then(json => dispatch(receiveBinaries(json)));
  }
}


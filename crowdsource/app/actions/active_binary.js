'use strict';
import { nav } from '../wrappers/app';

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

export const CREATE_BINARY = 'CREATE_BINARY';

export function creatingBinary() {
  return {
    type: CREATE_BINARY
  }
}

export function createBinary(form) {
  return function(dispatch) {
    dispatch(requestBinary(null));
    return fetch('https://crowdsourcehelp.herokuapp.com/binaries', {
        method: 'POST',
        body: JSON.stringify(form)
      }).then( response => response.json() )
        .then( json => {
          dispatch(receiveBinary(json, json.id));
          nav.replace({
            name: 'show',
            id: json.id,
            color: Math.floor(Math.random() * 360)
          });
        })
        .catch( error => console.error(error));
  }
}

export function refreshBinary(id) {
  return function(dispatch) {
    dispatch(requestBinary(id));
    return fetch(`https://crowdsourcehelp.herokuapp.com/binaries/${id }`)
      .then(response => response.json())
      .then(json => dispatch(updateBinary(json, id)))
  }
}

export function fetchBinary(id) {
  return function(dispatch) {
    dispatch(requestBinary(id));
    return fetch(`https://crowdsourcehelp.herokuapp.com/binaries/${id }`)
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
    return fetch(`https://crowdsourcehelp.herokuapp.com/binaries/${binary_id }`, {
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

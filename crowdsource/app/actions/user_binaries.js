'use strict';

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
    return fetch(`https://crowdsourcehelp.herokuapp.com/user/${user_id }`)
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
    return fetch(`https://crowdsourcehelp.herokuapp.com/user/${user_id }`)
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

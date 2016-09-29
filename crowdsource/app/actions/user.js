'use strict';
import { AsyncStorage } from 'react-native';
import { nav } from '../wrappers/app';

export const LOGGING_IN_REMOTE = 'LOGGING_IN_REMOTE';

export function loggingInRemote(name) {
  return {
    type: LOGGING_IN_REMOTE,
    name: name,
    loggedIn: false,
    working: true
  }
}

export const LOGGING_IN_LOCAL = 'LOGGING_IN_LOCAL';

export function loggingInLocal(id, name) {
  return {
    type: LOGGING_IN_LOCAL,
    id: id,
    name: name,
    loggedIn: false,
    working: true
  }
}

export const LOGGED_IN = 'LOGGED_IN';

export function loggedIn(id, name) {
  return {
    type: LOGGED_IN,
    id: id,
    name: name,
    loggedIn: true,
    working: false
  }
}

export const USER_ERROR = 'USER_ERROR'

export function userError(response) {
  return {
    type: USER_ERROR,
    loggedIn: false,
    error: response.error,
    message: response.message,
    working: false
  }
}

export function alertUserError(response) {
  return function(dispatch) {
    return dispatch(userError(response))
  }
}

export function logInRemote(form) {
  return function(dispatch) {
    dispatch(loggingInRemote(form.username));
    return fetch('https://crowdsourcehelp.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify(form)
      }).then( response => response.json() )
        .then( json => {
          if (json.error) {
            dispatch(alertUserError(json));
          } else {
            AsyncStorage.multiSet([
              ['user_id_csh', String(json.data.id)],
              ['user_name_csh', String(json.data.username)]
            ]).then( () => {
                dispatch(loggedIn(json.data.id, json.data.username));
                nav.push({ name: 'index'});
            })
          }
        })
        .catch( error => dispatch(userError(error)) );
  }
}

export function logInLocal(id, name) {
  return function(dispatch) {
    dispatch(loggingInLocal(id, name));
    return dispatch(loggedIn(id, name))
  }
}

export function signIn(form) {
  return function(dispatch) {
    dispatch(loggingInRemote(form.username));
    return fetch('https://crowdsourcehelp.herokuapp.com/signup', {
          method: 'POST',
          body: JSON.stringify(form)
        })
        .then( response => response.json() )
        .then( json => {
          if (json.error) {
            dispatch(alertUserError(json));
          } else {
            AsyncStorage.multiSet([
              ['user_id_csh', String(json.data.id)],
              ['user_name_csh', String(json.data.username)]
            ]).then( () => {
                dispatch(loggingInRemote(json.data.id, json.data.username));
                nav.push({ name: 'index'});
            })
          }
        })
        .catch( error => dispatch(alertUserError(error)) );
  }
}

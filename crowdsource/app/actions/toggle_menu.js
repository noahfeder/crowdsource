'use strict';

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

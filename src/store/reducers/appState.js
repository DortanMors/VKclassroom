import React from 'react'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

const initialState = { 
  userSawIntro: false, 
  userInfo: null, 
  popout: <ScreenSpinner size='large'/>,
  snackbar: null,
  access_token: null,
  storageKeys: {
    STATUS: 'status'
  }
}
  
export default function appState(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_USERSAWINTRO':
      return {
        ...state,
        userSawIntro: action.payload
      };
    case 'UPDATE_USERINFO':
      return {
        ...state,
        userInfo: action.payload
      };
    case 'UPDATE_ACCESSTOKEN':
      return {
        ...state,
        access_token: action.payload
      };
    case 'SET_POPOUT':
      return {
        ...state,
        popout: action.payload
      };
    case 'SET_SNACKBAR':
      return {
        ...state,
        snackbar: action.payload
      };
    case 'UPDATE_STORAGEKEYS':
      return {
        ...state,
        storageKeys: action.payload
      };
    default:
      return state;
  }
}

export function getAccessToken(state){
  return state.appState.access_token
}

export function getUserInfo(state){
  return state.appState.userInfo
}

export function getPopout(state){
  return state.appState.popout
}

export function getUserSawIntro(state){
  return state.appState.userSawIntro
}

export function getSnackbar(state){
  return state.appState.snackbar
}

export function getStorageKeys(state){
  return state.appState.storageKeys
}
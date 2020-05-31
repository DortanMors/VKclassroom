import React from 'react'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

const initialState = { 
  userSawIntro: false, 
  userInfo: null, 
  popout: <ScreenSpinner size='large'/>,
  snackbar: null,
  access_token: null,
  userDocs: null,
  storageKeys: {
    STATUS: 'status'
  }
}
  
export default function appState(state = initialState, action) {
  if (action.type === 'UPDATE_USERSAWINTRO') {
    return {
      ...state,
      userSawIntro: action.payload
    };
  } 
  else if (action.type === 'UPDATE_USERINFO') {
    return {
        ...state,
        userInfo: action.payload
    };
  } 
  else if (action.type === 'UPDATE_ACCESSTOKEN') {
      return {
          ...state,
          access_token: action.payload
      };
  }
  else if (action.type === 'SET_POPOUT') {
    return {
        ...state,
        popout: action.payload
    };
  }
  else if (action.type === 'SET_SNACKBAR') {
    return {
        ...state,
        snackbar: action.payload
    };
  }
  else if (action.type === 'UPDATE_USERDOCS') {
    return {
        ...state,
        userDocs: action.payload
    };
  }
  else if (action.type === 'UPDATE_STORAGEKEYS') {
    return {
        ...state,
        storageKeys: action.payload
    };
  }
  return state;
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

export function getUserDocs(state){
  return state.appState.userDocs
}

export function getSnackbar(state){
  return state.appState.snackbar
}

export function getStorageKeys(state){
  return state.appState.storageKeys
}
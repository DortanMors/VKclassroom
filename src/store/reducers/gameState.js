import React from 'react'

const initialState = {
  game: null,
  rotation: 0
}
  
export default function appState(state = initialState, action) {
  switch(action.type) {
    case 'SET_ROTATION':
      return {
        ...state,
        rotation: action.payload
      }
    default:
      return state;
  }
}

export function getGame(state){
  return state.appState.game
}

export function getRotation(state){
  return state.appState.rotation
}
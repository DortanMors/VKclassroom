const initialState = {
  game: null,
  city: null,
  rotation: 0
}
  
export default function gameState(state = initialState, action) {
  switch(action.type) {
    case 'SET_ROTATION':
      return {
        ...state,
        rotation: action.payload
      }
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload
      }
    default:
      return state;
  }
}

export function getGame(state){
  return state.gameState.game
}

export function getRotation(state){
  return state.gameState.rotation
}

export function getCity(state){
  return state.gameState.city;
}
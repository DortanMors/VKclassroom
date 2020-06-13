const initialState = {
  game: null,
  city: null,
  rotation: 0,
  cityParameters: {
    tile_width: 25,
    tile_height: 25,
    //...
  }
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

export function getCityParameters(state){
  return state.gameState.cityParameters;
}
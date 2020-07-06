const initialState = {
  cards: []
}
  
export default function cardState(state = initialState, action) {
  switch(action.type) {
    case 'SET_CARDS':
      return {
        ...state,
        cards: action.payload
      }
    default:
      return state;
  }
}

export function getCards(state){
  return state.gameState.cards
}
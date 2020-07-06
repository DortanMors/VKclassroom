const initialState = {
  cards: [
    {
      title: 'Mors Corp.',
      photo: 'https://sun9-38.userapi.com/c206816/v206816747/155343/Jh6GEcRqGCk.jpg',
      info: {
        distance: 1
      }
    }
  ],
  gone: new Set()
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
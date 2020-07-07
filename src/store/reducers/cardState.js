const initialState = {
  cards: [
    {
      title: 'Mors Corp.',
      pics: ['https://sun9-38.userapi.com/c206816/v206816747/155343/Jh6GEcRqGCk.jpg'],
      info: {
        distance: 1,
        text: 'Chebureki'
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
    case 'SET_GONE':
      return {
        ...state,
        gone: action.payload
      }
    default:
      return state;
  }
}

export function getCards(state){
  return state.cardState.cards
}

export function getGone(state){
  return state.cardState.gone
}
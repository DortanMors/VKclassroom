const initialState = {
  cards: [
    {
      title: 'Mors Corp.',
      pics: ['https://sun9-38.userapi.com/c206816/v206816747/155343/Jh6GEcRqGCk.jpg'],
      info: {
        distance: 2,
        text: 'Chebureki'
      }
    },
    {
      title: 'Mors Corp.',
      pics: ['https://sun9-53.userapi.com/c857236/v857236000/1d070e/xPL-a-ASPCM.jpg','https://sun9-12.userapi.com/c854416/v854416000/2444b2/AaecX1f257w.jpg'],
      info: {
        distance: 1,
        text: 'Chebureki'
      }
    }
  ],
  number: 2,
  gone: new Set(),
  selected: new Set(),
  isCardsOver: false
}
  
export default function cardState(state = initialState, action) {
  switch(action.type) {
    case 'SET_CARDS':
      return {
        ...state,
        cards: action.payload
      }
    case 'SET_NUMBER':
      return {
        ...state,
        number: action.payload
      }
    case 'SET_GONE':
      return {
        ...state,
        gone: action.payload
      }
    case 'SET_IS_CARDS_OVER':
      return {
        ...state,
        isCardsOver: action.payload
      }
    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state;
  }
}

export function getCards(state){
  return state.cardState.cards
}

export function getSelected(state){
  return state.cardState.selected
}

export function getIsCardsOver(state){
  return state.cardState.isCardsOver
}

export function getGone(state){
  return state.cardState.gone
}

export function getNumber(state){
  return state.cardState.number
}
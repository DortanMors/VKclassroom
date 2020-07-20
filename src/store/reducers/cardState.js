const initialState = {
  cards: [],
  number: 2,
  gone: new Set(),
  selected: new Set(),
  isCardsOver: true
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
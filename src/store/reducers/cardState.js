const initialState = {
  cards: [],
  gone: new Set(),
  selected: new Set(),
  isCardsOver: true,
  nextPage: "",
  cityParam: "",
  searchParam: "",
  prevSearch: "",
  deckNum: 0,
  modalStatus: null,
  selectedCard: 0
}
  
export default function cardState(state = initialState, action) {
  switch(action.type) {
    case 'SET_MODAL_STATUS':
      return {
        ...state,
        modalStatus: action.payload
      }
    case 'SET_SELECTED_CARD':
      return {
        ...state,
        selectedCard: action.payload
      }
    case 'SET_DECK_NUM':
      return {
        ...state,
        deckNum: action.payload
      }
    case 'SET_PREV_SEARCH':
      return {
        ...state,
        prevSearch: action.payload
      }
    case 'SET_CITY_PARAM':
      return {
        ...state,
        cityParam: action.payload
      }
    case 'SET_SEARCH_PARAM':
      return {
        ...state,
        searchParam: action.payload
      }
    case 'SET_NEXT_PAGE':
      return {
        ...state,
        nextPage: action.payload
      }
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

export function getNextPage(state){
  return state.cardState.nextPage
}

export function getCityParam(state){
  return state.cardState.cityParam
}

export function getSearchParam(state){
  return state.cardState.searchParam
}

export function getPrevSearch(state){
  return state.cardState.prevSearch
}

export function getDeckNum(state){
  return state.cardState.deckNum
}

export function getSelectedCard(state){
  return state.cardState.selectedCard
}

export function getModalStatus(state){
  return state.cardState.modalStatus
}
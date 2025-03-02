import bridge from "@vkontakte/vk-bridge";

export function initApp(){
    return async (dispatch) => {
        bridge.send("VKWebAppInit");
        bridge.subscribe(({ detail: { type, data }}) => {
            if (!type) {
                console.error('invalid event', type);
                return;
            }
            switch(type){
                case 'VKWebAppUpdateConfig':
                    const schemeAttribute = document.createAttribute('scheme');
                    schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                    document.body.attributes.setNamedItem(schemeAttribute);
                    break;
                case 'VKWebAppUpdateInsets':
                    dispatch({
                        type: 'VK_INSETS_FETCHED',
                        insets: data.insets
                    });
                    break;
                default:
                    //nop;
            }
        });
    }
}

export function fetchData(STORAGE_KEYS, go){
    return async (dispatch) => {
        const user = await bridge.send('VKWebAppGetUserInfo');
        const storageData = await bridge.send('VKWebAppStorageGet', {
            keys: Object.values(STORAGE_KEYS)
        });
        const data = {};
        storageData.keys.forEach(({key,value}) => {
            try{
                data[key] = value? JSON.parse(value) : {};
                switch(key){
                    case STORAGE_KEYS.STATUS:
                        if (data[key].sawIntro){
                            // TODO вот тут перенаправить как-то на homePanel
                            dispatch({
                                type: 'UPDATE_USERSAWINTRO',
                                payload: true
                            });
                            go('home');
                        }
                        break;
                    default:
                        break;
                }
            }catch(error){
                console.log('Не узнал, про intro', error()); // обработать
            }
        })
        dispatch({
            type: 'UPDATE_USERINFO',
            payload: user
        })
        dispatch({
            type: 'SET_CITY_PARAM',
            payload: user.city?user.city.title:""
        })
        dispatch({
            type: "SET_POPOUT",
            payload: null
        })
    }
}

export function setStorageSawIntro(STORAGE_KEYS){
    return async (dispatch) => {
        await bridge.send('VKWebAppStorageSet',{
            key: STORAGE_KEYS.STATUS,
            value: JSON.stringify({
                sawIntro: true
            })
        });
    }
}

export function setNextPage(token){
    return (dispatch) => {
        dispatch({
            type: 'SET_NEXT_PAGE',
            payload: token
        });
    }
}

export function fetchCards(city, nextPage, query, opennow, prevSearch, deckNum, cards){
    return async (dispatch) => {
        const request = city+" "+query;
        if (request===prevSearch) {
            if (deckNum<3) {
                dispatch({
                    type: 'SET_DECK_NUM',
                    payload: deckNum+1
                });
                dispatch(setCards(cards.slice(5)));
            }
            else if ((deckNum===3) || (cards.length<5)) {
                dispatch({
                    type: 'SET_DECK_NUM',
                    payload: 0
                });
                if (nextPage.length > 0) {
                    const url = 'https://vfom.in/ClassroomWebapp/classroom?pagetoken='+nextPage;
                    const json_cards = await fetch(url, {mode: 'cors'})
                                        .then(response => response.json());
                    if (json_cards.hasOwnProperty('results')) {
                        dispatch({
                            type: 'SET_DECK_NUM',
                            payload: 0
                        });
                        dispatch(setNextPage(json_cards.next_page_token));
                        dispatch(setCards(json_cards.results));
                    }
                }
                else {
                    dispatch(setCards([{
                                        name: "Нет результатов",
                                        rating: 404,
                                        formatted_address: "",
                                        photo: 'https://w7.pngwing.com/pngs/777/110/png-transparent-sadness-smiley-emoticon-smiley-miscellaneous-face-head.png'
                                    }])
                    );
                }
            }
        } 
        else {
            const url = 'https://vfom.in/ClassroomWebapp/classroom?query='
                        +request+opennow+nextPage;
            const json_cards = await fetch(url, {mode: 'cors'})
                                .then(response => {
                                    return response.json();
                                });
            if (!json_cards.hasOwnProperty('results')){
                dispatch(setCards([{
                    name: "Нет результатов",
                    rating: 404,
                    formatted_address: "",
                    photo: 'https://w7.pngwing.com/pngs/777/110/png-transparent-sadness-smiley-emoticon-smiley-miscellaneous-face-head.png'
                    }])
                );
            }
            else {
            dispatch(setNextPage(json_cards.next_page_token));
            dispatch({
                type: 'SET_DECK_NUM',
                payload: json_cards.results.length>10? 0: 1
            });
            dispatch(setCards(json_cards.results));
            }
            dispatch({
                type: 'SET_PREV_SEARCH',
                payload: city+" "+query
            });
        }
        dispatch(setIsCardsOver(false));
    }
}

export function setCityParam(city){
    return (dispatch) => {
        dispatch({
            type: 'SET_CITY_PARAM',
            payload: city
        })
    }
}

export function setSearchParam(search){
    return (dispatch) => {
        dispatch({
            type: 'SET_SEARCH_PARAM',
            payload: search
        })
    }
}

export function setSelected(selected){
    return (dispatch) => {
        dispatch({
            type: 'SET_SELECTED',
            payload: selected
        })
    }
}

export function setIsCardsOver(bool){
    return (dispatch) => {
        dispatch({
            type: 'SET_IS_CARDS_OVER',
            payload: bool
        })
    }
}

export function setCards(cards){
    return (dispatch => {
        dispatch({
            type: 'SET_CARDS',
            payload: cards
        })
    })
}

export function setModal(status, num){

    return (dispatch => {
        dispatch({
            type: 'SET_MODAL_STATUS',
            payload: status
        });
        if (status){
            dispatch({
                type: 'SET_SELECTED_CARD',
                payload: num
            });
        }
    })
}
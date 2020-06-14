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

export function fetchData(STORAGE_KEYS, create_city){
    return async (dispatch) => {
        const user = await bridge.send('VKWebAppGetUserInfo');
        const storageData = await bridge.send('VKWebAppStorageGet', {
            keys: Object.values(STORAGE_KEYS)
        });
        console.log(storageData); // удалить
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
            type: "SET_POPOUT",
            payload: null
        })



        const city = create_city(user.city.id,0.15,20,30);
        dispatch({
            type: 'SET_CITY',
            payload: city
        })
        let roads = [];
        for(let i = 0; i < city.M-1; ++i){
            for(let j = 0; j < city.N-1; ++j){
                if(city.nodes[i*city.N+j].road_node && city.nodes[i*city.N+j+1].road_node){
                    roads.push({isVertical: false, n: j, m: i})
                }
                if(city.nodes[i*city.N+j].road_node && city.nodes[(i+1)*city.N+j].road_node){
                    roads.push({isVertical: true, n: j, m: i})
                }
                //TODO нижние дороги тоже
            }
        }
        dispatch({
            type: 'SET_ROADS',
            payload: roads
        })
    }
}

export function fetchDocs(){
    return async (dispatch) => {
        // TODO: переписать с получением токена
        // TODO: получать app_id из конфига
        const token = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 7472666, scope: 'friends,status,docs'});
        console.log(token); // удалить
        dispatch({
            type: 'UPDATE_ACCESSTOKEN',
            payload: token
        });
        const docs = await bridge.send('VKWebAppCallAPIMethod', {
            method: 'docs.get', params: {
                count: 5,
                offset:0,
                type: 0,
                v: '5.103',
                access_token: token.access_token
            }
        });
        console.log(docs); // удалить
        dispatch({
            type: 'UPDATE_USERDOCS',
            payload: docs
        });
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




// экшены для игры
export function setRotation(angle){
    return async (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'SET_ROTATION',
                payload: angle
            })
        }, 50);
    }
}

export function setContainerPos(pos){
    return (dispatch) => {
        dispatch({
            type: 'SET_CONTAINER_POS',
            payload: pos
        })
    }
}

export function setPrevContainerPos(prevPos){
    return (dispatch) => {
        dispatch({
            type: 'SET_PREV_CONTAINER_POS',
            payload: prevPos
        })
    }
}
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
            }
            for(let i = 0; i < city.N-1; ++i){
                if(city.nodes[(city.M-1)*city.N+i].road_node && city.nodes[(city.M-1)*city.N+i+1].road_node){
                    roads.push({isVertical: false, n: i, m: city.M-1})
                }
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

export function setDirByMove(e){
    return (dispatch) => {
        let newDir;
        if(e.isX){
            newDir = e.shiftX > 0? 'right' : 'left';
        } else if(e.isY){
            newDir = e.shiftY > 0? 'down' : 'up';
        } else {
            newDir = 'stop';
        }
        dispatch({
            type: 'SET_NEW_CUR_DIR',
            payload: newDir
        });
    };
}

export function updateTick(city,dudePos,dudePath,dudeCurDir,dudeNewDir){
    return async(dispatch) => {
        const speed = 0.05; // TODO: сделать поправку на время, чтобы перемещение было равномерно
        let isDirChange = true;
        let isPosChange = true;
        let dudeNewCurDir = dudeCurDir;
        if(dudeCurDir==='stop'){
            switch(dudeNewDir){
                case 'up':
                    dudeNewCurDir = dudePos.y>0 && city.nodes[(dudePos.y-1)*city.N+dudePos.x].road_node? 'up' : 'stop';
                    break;
                case 'right':
                    dudeNewCurDir = dudePos.x<city.N-1 && city.nodes[dudePos.y*city.N+dudePos.x+1].road_node? 'right' : 'stop';
                    break;
                case 'down':
                    dudeNewCurDir = dudePos.y<city.M-1 && city.nodes[(dudePos.y+1)*city.N+dudePos.x].road_node? 'down' : 'stop';
                    break;
                case 'left':
                    dudeNewCurDir = dudePos.x>0 && city.nodes[dudePos.y*city.N+dudePos.x-1].road_node? 'left' : 'stop';       
                    break;         
                default:
                    isDirChange = false;
            }
        }
        if(dudePath.y+speed>=1 || dudePath.x+speed>=1 || dudePath.y-speed<=-1 || dudePath.x-speed<=-1){
            dudePath = { x:0, y:0 };
            switch(dudeCurDir){
                case 'up':
                    dudePos = {
                        ...dudePos,
                        y:dudePos.y-1
                    }
                    break;
                case 'right':
                    dudePos = {
                        ...dudePos,
                        x:dudePos.x+1
                    }
                    break;
                case 'down':
                    dudePos = {
                        ...dudePos,
                        y:dudePos.y+1
                    }
                    break;
                case 'left':
                    dudePos = {
                        ...dudePos,
                        x:dudePos.x-1
                    }
                    break;
                default:
                    isPosChange = false;
            }
            dudeNewCurDir='stop';
        }else{
            isPosChange = false;
            switch(dudeCurDir){
                case 'up':
                    dudePath={x:0, y:dudePath.y- speed * 1} // TODO: *1 заменить на единицу времени
                    break;
                case 'right':
                    dudePath={x:dudePath.x+ speed * 1, y:0} // TODO: *1 заменить на единицу времени
                    break;
                case 'down':
                    dudePath={x:0, y:dudePath.y+ speed * 1} // TODO: *1 заменить на единицу времени
                    break;
                case 'left':
                    dudePath={x:dudePath.x- speed * 1, y:0} // TODO: *1 заменить на единицу времени
                    break;
                default:
                    //nothing
            }
        }
        setTimeout(()=>{
            dispatch({
                type: 'SET_DUDE_PATH',
                payload: dudePath
            });
            if(isPosChange){
                dispatch({
                    type: 'SET_DUDE_POS',
                    payload: dudePos
                });
            }
            if(dudeNewCurDir!==dudeCurDir){
                dispatch({
                    type: 'SET_CUR_DIR',
                    payload: dudeNewCurDir
                });
            }
        }, 100);
    }
}
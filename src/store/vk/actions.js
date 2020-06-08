import bridge from "@vkontakte/vk-bridge";
import * as PIXI from 'pixi.js'

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

export function fetchData(STORAGE_KEYS){
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
                console.log('Бля, не узнал, про intro', error()); // обработать
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

export function setGame() {
    return (dispatch) => {
        var width = window.innerWidth; //получаем ширину экрана
        var height = window.innerHeight; // получаем высоту экрана
        const app = new PIXI.Application(width,height); //создаем глобальную переменную нашей игры

        /*var model = {
            createCanvas: function() {
                app = new PIXI.Application(width, height); //создаем холст
                document.body.appendChild(app.view); //выводим его в тело страницы
            }
        }*/
        document.body.appendChild(app.view);
 
        const texture = PIXI.Texture.from('C:/Users/Dortan/Documents/NodeJs/classroom/src/img/persik.png');
        var persikSprite = new PIXI.Sprite(texture);
        app.stage.addChild(persikSprite);
        persikSprite.x = app.screen.width / 2;
        persikSprite.y = app.screen.height / 2;

        /*
        app.loader.add('persik', '../../img/persik.png').load((loader, resources) => {
        
            const persik = new PIXI.Sprite(resources.persik.texture);
        
            // Setup the position of the persik
            persik.x = app.renderer.width / 2;
            persik.y = app.renderer.height / 2;
        
            // Rotate around the center
            persik.anchor.x = 0.5;
            persik.anchor.y = 0.5;
        
            // Add the bunny to the scene we are building.
            app.stage.addChild(persik);
        
            // Listen for frame updates
            app.ticker.add(() => {
                // each frame we spin the bunny around a bit
                persik.rotation += 0.01;
            });
        });
        */
        app.ticker.add((delta) => {
            persikSprite.rotation += 0.01 * delta;
        });
        dispatch({
            type: 'SET_GAME',
            payload: app
        });
    }
}


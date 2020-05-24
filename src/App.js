import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import SnackBar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro';

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro'
};

const STORAGE_KEYS = {
	STATUS: 'status'
};

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.INTRO);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userSawIntro, setUserSawIntro] = useState(false);
	const [snackBar, setSnackBar] = useState(null);
	const [userToken, setUserToken] = useState(null);
	const [userDocs, setUserDocs] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet', {
				keys: Object.values(STORAGE_KEYS)
			});
			console.log(storageData); // временное говно
			const data = {};
			storageData.keys.forEach(({key,value}) => {
				try{
					data[key] = value? JSON.parse(value) : {};
					switch(key){
						case STORAGE_KEYS.STATUS:
							if (data[key].sawIntro){
								setActivePanel(ROUTES.HOME);
								setUserSawIntro(true);
							}
							break;
						default:
							break;
					}
				}catch(error){
					setSnackBar(
						<SnackBar 
							layout='vertical' 
							onClose={()=> setSnackBar(null)}
							before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic-red)'}}>
									<Icon24Error fill='#fff' width='14' height='14'/>
								</Avatar>}
							duration={666}>
							Данные из Storage недоступны
						</SnackBar>
					)};
			});
			setUser(user);
			setPopout(null);
		}
		fetchData();

		async function fetchToken() {
			const token = await bridge.send('VKWebAppGetAuthToken', {
				app_id: 7472666, scope: 'friends,status,docs'});
			console.log(token);
			setUserToken(token);
			const docs = await bridge.send('VKWebAppCallAPIMethod', {
				method: 'docs.get', request_id:'32test', params: {
					count: 5,
					offset:0,
					type: 0,
					v: '5.103',
					access_token: token.access_token
				}
			});
			console.log(docs);
			setUserDocs(docs);
		};
		fetchToken();

		

		
	}, []);

	const go = (panel) => {
		setActivePanel(panel);
	};

	const persik = () => {
		return(
			<SnackBar 
				layout='vertical' 
				onClose={()=> setSnackBar(null)}
				before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic-red)'}}>
						<Icon24Error fill='#fff' width='14' height='14'/>
					</Avatar>}
				duration={666}>
				Персик
			</SnackBar>
		)
	};

	const viewIntro = async function(){
		try{
			await bridge.send('VKWebAppStorageSet',{
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({
					sawIntro: true
				})
			});
			go(ROUTES.HOME);
		}catch(error){
			setSnackBar(
				<SnackBar 
					layout='vertical' 
					onClose={()=> setSnackBar(null)}
					before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic-red)'}}>
							<Icon24Error fill='#fff' width='14' height='14'/>
						</Avatar>}
					duration={666}>
					Загрузка в Storage недоступна
				</SnackBar>
			)
		};
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={persik} snackbarError={snackBar} token={userToken} docs={userDocs}/>
			<Intro id={ROUTES.INTRO} go={viewIntro} fetchedUser={fetchedUser} snackbarError={snackBar} userSawIntro={userSawIntro}/>
		</View>
	);
}

export default App;


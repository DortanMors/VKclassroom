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
			console.log(storageData);
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

		async function fetchDocs() {
			console.log(0);
			const docs = await bridge.send('VKWebAppDocsGet', {
				count: 5
			});
			console.log(1);
			console.log(docs);
			console.log(2);
		}
		fetchDocs();
	}, []);

	const go = (panel) => {
		setActivePanel(panel);
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
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go} snackbarError={snackBar}/>
			<Intro id={ROUTES.INTRO} go={viewIntro} fetchedUser={fetchedUser} snackbarError={snackBar} userSawIntro={userSawIntro}/>
		</View>
	);
}

export default App;


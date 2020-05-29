import React, { Fragment, Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, Avatar, Group, FixedLayout, Button, Div, Snackbar } from '@vkontakte/vkui'
import Icon24Error from '../../node_modules/@vkontakte/icons/dist/24/error.js';
import { setStorageSawIntro } from '../store/vk/actions'

import './Intro.css';
import '@vkontakte/vkui/dist/vkui.css';

class Intro extends Component {
	render() {
		return (
			<Panel id={this.props.id} centered={true}>
			<PanelHeader>
				VK classroom
			</PanelHeader>
			{(!this.props.store.appState.userSawIntro && this.props.store.appState.userInfo) &&
				<Fragment>
					<Group>
						<Div className='userinfo'>
							{this.props.store.appState.userInfo.photo_200 && <Avatar src={this.props.store.appState.userInfo.photo_200} />}
							<h2>Здравствуйте, {this.props.store.appState.userInfo.first_name}!</h2>
							<h3>Сервис находится в активной разработке, и, надеемся, в будущем поможет в организации дистанционного обучения!</h3>
						</Div>
					</Group>
					<FixedLayout vertical='bottom'>
						<Div>
							<Button mode='primary' size='xl' onClick={() => {
									try{
										this.props.dispatch(setStorageSawIntro(this.props.store.appState.storageKeys))
										this.props.router.navigate('home')
									}catch(error){
										this.props.dispatch({
											type: 'SET_SNACKBAR',
											payload: <Snackbar 
														layout='vertical' 
														onClose={()=> this.props.dispatch({ type: 'SET_SNACKBAR', payload: null })}
														before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic-red)'}}>
																<Icon24Error fill='#fff' width='14' height='14'/>
															</Avatar>}
														duration={666}>
														Загрузка в Storage недоступна
													</Snackbar>
										})
									}
									
								}}
							>
								Продолжить
							</Button> 
						</Div>
					</FixedLayout>
				</Fragment>
			}
			{this.props.store.appState.snackbar}
		</Panel>
		);
	}
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Intro);
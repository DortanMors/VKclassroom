import React, { Fragment, Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, Avatar, Group, FixedLayout, Button, Div, Snackbar } from '@vkontakte/vkui'
import Icon24Error from '@vkontakte/icons/dist/24/error';
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
			{this.props.userInfo &&
				<Fragment>
					<Group>
						<Div className='userinfo'>
							{this.props.userInfo.photo_200 && <Avatar src={this.props.userInfo.photo_200} />}
							<h2>Здравствуйте, {this.props.userInfo.first_name}!</h2>
							<h3>Такие дела</h3>
						</Div>
					</Group>
					<FixedLayout vertical='bottom'>
						<Div>
							<Button mode='primary' size='xl' onClick={() => {
									try{
										this.props.dispatch(setStorageSawIntro(this.props.storageKeys))
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
			{this.props.snackbar}
		</Panel>
		);
	}
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Intro);
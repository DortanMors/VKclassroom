import React, { Fragment, Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, Avatar, FixedLayout, Button, Div, Snackbar } from '@vkontakte/vkui'
import Icon24Error from '@vkontakte/icons/dist/24/error';
import { setStorageSawIntro, setJustOpened } from '../store/vk/actions'

import '@vkontakte/vkui/dist/vkui.css';

class Intro extends Component {
	componentDidMount(){
		if (this.props.userSawIntro && this.props.justOpened){
			this.props.router.navigate('home');
			this.props.dispatch(setJustOpened(false));
		}
	}

	render() {
		return (
			<Panel id={this.props.id} centered={true}>
			<PanelHeader>
				Fun Finder
			</PanelHeader>
				<Fragment>
					<FixedLayout vertical='top'>
						<h3>
							Сервис предназначен для выбора досуга. Переключитесь на раздел "Погнали" и начните поиск. 
							Вам будут предложены карточки мест для посещения. Смахните карточку понравившегося варианта вправо, он отобразится в разделе "Главная"
						</h3>
					</FixedLayout>
					<FixedLayout vertical='bottom'>
						<h5>Внимание: сервис получает данные из сторонних источников, что может использовать дополнительный траффик.</h5>
						<Div>
							<Button mode='primary' size='xl' onClick={() => {
									try{
										this.props.dispatch(setStorageSawIntro(this.props.storageKeys));
										this.props.router.navigate('home');
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
							<h4>Информация получена с помощью Google</h4>
						</Div>
					</FixedLayout>
				</Fragment>
			{this.props.snackbar}
		</Panel>
		);
	}
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Intro);
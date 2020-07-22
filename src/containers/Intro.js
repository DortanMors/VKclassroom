import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, FixedLayout, Button, Div } from '@vkontakte/vkui'
import { setStorageSawIntro } from '../store/vk/actions'

class Intro extends Component {

	render() {
		return (!this.props.popout &&
			<Panel id={this.props.id}>
				<PanelHeader>Fun Finder</PanelHeader>
					<Div>
						<h3>
							Сервис предназначен для выбора досуга. Переключитесь на раздел "Погнали" и начните поиск. 
							Вам будут предложены карточки мест для посещения. Смахните карточку понравившегося варианта вправо, он отобразится в разделе "Главная"
						</h3>
					</Div>
					<Div>
						<Button mode='primary' size='xl' onClick={() => {
								try{
									this.props.dispatch(setStorageSawIntro(this.props.storageKeys));
									this.props.router.navigate('home');
								}catch(error){console.log(error)}
							}}
						>Продолжить</Button>
					</Div>
					<FixedLayout vertical="bottom">
						<Div>
							<h5>Внимание: сервис получает данные из сторонних источников, что может использовать дополнительный траффик.</h5>
							<h5>Информация получена с помощью Google</h5>
						</Div>
					</FixedLayout>
				{this.props.snackbar}
		</Panel>
		);
	}
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Intro);
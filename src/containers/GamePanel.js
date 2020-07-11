import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../styles/GamePanel.css';
import { Panel, PanelHeader, Button} from '@vkontakte/vkui';

import { getCards, getIsCardsOver } from '../store/reducers/cardState';
import { setIsCardsOver, setCards } from '../store/vk/actions';
import Deck from './Deck';

class GamePanel extends Component {

	render(){
		return (
			<Panel id={this.props.id} centered={true} className='deckroot'>
				<PanelHeader>
					VK classroom
				</PanelHeader>
				<Deck
					id={this.props.id}
                    router={this.props.router}
					gone={this.props.gone}
					cards={this.props.cards}
				/>
				{(console.log('RENDER!') || this.props.isCardsOver) && 
				<Button
					size="xl" level="2"
					onClick={()=> {
						this.props.dispatch(setIsCardsOver(false));
						const i = this.props.cards[0].distance       // TODO логика добавления новых карточек
						this.props.dispatch(setCards([
							{
								title: 'Mors Corp.',
								pics: ['https://sun9-38.userapi.com/c206816/v206816747/155343/Jh6GEcRqGCk.jpg'],
								info: {
								  distance: i+2,
								  text: 'Chebureki'
								}
							  },
							  {
								title: 'Mors Corp.',
								pics: ['https://sun9-53.userapi.com/c857236/v857236000/1d070e/xPL-a-ASPCM.jpg','https://sun9-12.userapi.com/c854416/v854416000/2444b2/AaecX1f257w.jpg'],
								info: {
								  distance: i+3,
								  text: 'Chebureki'
								}
							  }
						]))
					}}
				>Получить ещё</Button>}
			</Panel>
		);
	}
}


function mapStateToProps(state) {
    return {
		cards: getCards(state),
		isCardsOver: getIsCardsOver(state)
	};
}


export default connect(mapStateToProps)(GamePanel);
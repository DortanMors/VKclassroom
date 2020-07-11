import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../styles/GamePanel.css';
import { Panel, PanelHeader, Button} from '@vkontakte/vkui';

import { getCards, getIsCardsOver, getGone, getNumber } from '../store/reducers/cardState';
import { setIsCardsOver, setCards, setNumber, setGone } from '../store/vk/actions';
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
						this.props.dispatch(setGone(new Set()));
						this.props.dispatch(setIsCardsOver(false));
						const i = this.props.number+1       // TODO логика добавления новых карточек
						this.props.dispatch(setCards([
							{
								title: 'Mors Corp.',
								pics: ['https://sun9-38.userapi.com/c206816/v206816747/155343/Jh6GEcRqGCk.jpg'],
								info: {
								  distance: i+1,
								  text: 'Chebureki'
								}
							  },
							  {
								title: 'Mors Corp.',
								pics: ['https://sun9-53.userapi.com/c857236/v857236000/1d070e/xPL-a-ASPCM.jpg','https://sun9-12.userapi.com/c854416/v854416000/2444b2/AaecX1f257w.jpg'],
								info: {
								  distance: i,
								  text: 'Chebureki'
								}
							  }
						]));
						this.props.dispatch(setNumber(i+1));
					}}
				>Получить ещё</Button>}
			</Panel>
		);
	}
}


function mapStateToProps(state) {
    return {
		cards:		 getCards(state),
		isCardsOver: getIsCardsOver(state),
		gone: 		 getGone(state),
		number:		 getNumber(state)
	};
}


export default connect(mapStateToProps)(GamePanel);
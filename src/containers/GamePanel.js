import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../styles/GamePanel.css';
import { Panel, PanelHeader, Button} from '@vkontakte/vkui';

import { getCards, getIsCardsOver } from '../store/reducers/cardState';
import { setIsCardsOver } from '../store/vk/actions';
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
					onClick={()=>this.props.dispatch(setIsCardsOver(false))}
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
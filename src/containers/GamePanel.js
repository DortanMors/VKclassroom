import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../styles/GamePanel.css';
import { Panel, PanelHeader, Button} from '@vkontakte/vkui';

import { getCards, getIsCardsOver, getGone, getNumber, getSelected } from '../store/reducers/cardState';
import { setIsCardsOver, setCards} from '../store/vk/actions';
import Deck from './Deck';

class GamePanel extends Component {

	render(){
		return (
			<Panel id={this.props.id} centered={true} className='deckroot'>
				<PanelHeader>
					VK classroom
				</PanelHeader>
				{(console.log('RENDER DECK AS A CHILD') || !this.props.isCardsOver) && <Deck
					id={this.props.id}
					router={this.props.router}
					
					gone={this.props.gone}
					cards={this.props.cards}
					selected={this.props.selected}
				/>}
				{(console.log('RENDER!') || this.props.isCardsOver) && 
				<Button
					size="xl" level="2"
					onClick={()=> {
						fetch('http://localhost:8080/classroom?getcards=5')
							.then(response => response.json())
							.then(json => this.props.dispatch(setCards(json)))
							.then(() => this.props.dispatch(setIsCardsOver(false)));
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
		number:		 getNumber(state),
		selected:    getSelected(state)
	};
}


export default connect(mapStateToProps)(GamePanel);
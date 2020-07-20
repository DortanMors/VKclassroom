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
			<Panel id={this.props.id} centered={true} className='deckroot gamepanel'>
				<PanelHeader>
					Fun Finder
				</PanelHeader>
				{(!this.props.isCardsOver) && <Deck
					id={this.props.id}
					router={this.props.router}
					
					gone={this.props.gone}
					cards={this.props.cards}
					selected={this.props.selected}
				/>}
				{this.props.isCardsOver && 
				<Button
					size="xl" level="2"
					onClick={()=> {
						const opennow = "";
						const url = 'https://vfom.in/ClassroomWebapp/classroom?query='+(this.props.userInfo.city.title?this.props.userInfo.city.title:'')+'+пиццерии'+opennow+'&pagetoken';
						fetch(url, {mode: 'cors'})
							.then(response => { return response.json()})
							.then(json => { this.props.dispatch(setCards(json.results))})
							.then(() => this.props.dispatch(setIsCardsOver(false)));
					}}
				>Получить карточки</Button>}
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
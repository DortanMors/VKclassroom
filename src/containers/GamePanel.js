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
					VK classroom
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
						fetch('https://vfom.in/ClassroomWebapp/classroom?query=самара+пиццерии&opennow=false&pagetoken', {mode: 'cors'})
							.then(response => {console.log(response); return response.json()})
							.then(json => {console.log(json); return json;})
							.then(json => this.props.dispatch(setCards(json.results)))
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
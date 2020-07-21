import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../styles/GamePanel.css';
import { Panel, PanelHeader, Button, FormLayout, Input, FormLayoutGroup} from '@vkontakte/vkui';

import { getCards, getIsCardsOver, getGone, getNumber, getSelected, getCityParam, getSearchParam, getNextPage, getPrevSearch, getDeckNum } from '../store/reducers/cardState';
import { fetchCards, setCityParam, setSearchParam } from '../store/vk/actions';
import Deck from './Deck';

class GamePanel extends Component {

	render(){
		return (
			<Panel id={this.props.id} centered={true} className='deckroot gamepanel'>
				<PanelHeader>
					Fun Finder
				</PanelHeader>
				{(!this.props.isCardsOver) && 
				<Deck
					id={this.props.id}
					router={this.props.router}
					
					gone={this.props.gone}
					cards={this.props.cards}
					selected={this.props.selected}
				/>}
				{this.props.isCardsOver && 
				<FormLayout>
					<FormLayoutGroup top="Параметры поиска">					
						<Input
							name="cityparam"
							type="text"
							value={this.props.cityParam}
							onChange={(e)=>this.props.dispatch(setCityParam(e.currentTarget.value))}
							placeholder="Ваш город"
						/>
						<Input
							name="searchparam"
							type="text"
							onChange={(e)=>this.props.dispatch(setSearchParam(e.currentTarget.value))}
							placeholder="Что будем искать"
						/>
					</FormLayoutGroup>
					<Button
						size="xl" level="2"
						onClick={()=> {
							const opennow = "";
							const nextPage = this.props.nextPage?this.props.nextPage:"";
							this.props.dispatch(fetchCards(
													this.props.cityParam, 
													nextPage, 
													this.props.searchParam,
													opennow,
													this.props.prevSearch,
													this.props.deckNum)
												);
						}}
					>Получить карточки</Button>
				</FormLayout>}
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
		selected:    getSelected(state),
		cityParam:   getCityParam(state),
		searchParam: getSearchParam(state),
		nextPage:    getNextPage(state),
        prevSearch:  getPrevSearch(state),
        deckNum:     getDeckNum(state)
	};
}


export default connect(mapStateToProps)(GamePanel);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { RouteNode } from 'react-router5';

import '../styles/GamePanel.css';
import { Panel, PanelHeader} from '@vkontakte/vkui';

import { getCards } from '../store/reducers/cardState';
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
			</Panel>
		);
	}
}


function mapStateToProps(state) {
    return {
		cards: getCards(state),
	};
}


export default connect(mapStateToProps)(
    (props) => (
        <RouteNode nodeName="game">
            {({ route }) => <GamePanel route={route} {...props}/>}
        </RouteNode>
    )
);
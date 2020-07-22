import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, Group, Cell, Avatar, List, Div } from '@vkontakte/vkui';

class Home extends Component {

	render() {

		return(
			<Panel id={this.props.id}>
				<PanelHeader>Fun Finder</PanelHeader>
				<Div>
						<h1> 
							Вам понравилось:
						</h1>
					</Div>
				<Group title='Selected cards'>
					<List>
						{ this.props.selected.size===0 && 
						<Div>
							<h3>Вы ещё ничего не выбрали. Чтобы добавить место, смахните карточку вправо.</h3> 
						</Div>}
						{ this.props.selected.size>0 && [...this.props.selected].map((card, i)=>{
							return(
								<Cell key={card.formatted_address} before={<Avatar size={24} src={card.photo?card.photo:""}/>}>
									{card.name} {card.rating} {card.formatted_address}
								</Cell>
							)
						})}
					</List>
				</Group>
			</Panel>
		);
	}
}

function mapStateToProps(state) {
    return {
        //notificationStatus: vkSelectors.getNotificationStatus(state),
    };
}

export default connect(mapStateToProps)(Home);
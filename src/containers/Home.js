import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, Group, Cell, Avatar, List, Div } from '@vkontakte/vkui';

class Home extends Component {

	render() {

		return(
			<Panel id={this.props.id}>
				<PanelHeader>Fun Finder</PanelHeader>
				{this.props.userInfo &&
				<Group title="User Data Fetched with VK Bridge">
					<Cell
						before={this.props.userInfo.photo_200 ? <Avatar src={this.props.userInfo.photo_200}/> : null}
						description={this.props.userInfo.city && this.props.userInfo.city.title ? this.props.userInfo.city.title : ''}
					>
						{`${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`}
					</Cell>
				</Group>}
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
						{ this.props.selected.size>0 && this.props.selected.map((card)=>{
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
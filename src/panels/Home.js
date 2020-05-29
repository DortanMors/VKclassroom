import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, Button, Group, Cell, Avatar, List } from '@vkontakte/vkui';
import * as vkSelectors from '../store/vk/reducers'
import Modal from '../Modal'
import Icon24Document from '@vkontakte/icons/dist/24/document';

class Home extends Component {

	render() {

		return(
			<Panel id={this.props.id}>
				<PanelHeader>VK classroom</PanelHeader>
				{this.props.store.appState.userInfo &&
				<Group title="User Data Fetched with VK Bridge">
					<Cell
						before={this.props.store.appState.userInfo.photo_200 ? <Avatar src={this.props.store.appState.userInfo.photo_200}/> : null}
						description={this.props.store.appState.userInfo.city && this.props.store.appState.userInfo.city.title ? this.props.store.appState.userInfo.city.title : ''}
					>
						{`${this.props.store.appState.userInfo.first_name} ${this.props.store.appState.userInfo.last_name}`}
					</Cell>
				</Group>}
				<Group title='Docs and sucks'>
					<Button  size="xl" level="2" onClick={() =>{
						
					}}> Чекнуть доки </Button>
				</Group>
				<List>
					{ this.props.store.appState.userDocs && this.props.store.appState.userDocs.hasOwnProperty('items') && this.props.store.appState.userDocs.response.items.map((doc, index)=>{
						return(
							<Cell key={index} href={doc.url} before={<Avatar size={24}><Icon24Document width='14' height='14' /></Avatar>}>
								{doc.title}
							</Cell>
						)
					})}
				</List>
				<Modal />
			</Panel>
		);
	}
}

function mapStateToProps(state) {
    return {
        notificationStatus: vkSelectors.getNotificationStatus(state),
    };
}

export default connect(mapStateToProps)(Home);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, Button, Group, Cell, Avatar, List, Div } from '@vkontakte/vkui';
import Modal from '../Modal'
import Icon24Document from '@vkontakte/icons/dist/24/document';
import { fetchDocs } from '../store/vk/actions';
import Srand from 'prng';

class Home extends Component {

	render() {

		return(
			<Panel id={this.props.id}>
				<PanelHeader>VK classroom</PanelHeader>
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
						<Button  size="xl" level="2" onClick={() =>{
							let prng = new Srand(this.props.userInfo.city.id);
							for(let i = 1; i<10; ++i){
									console.log(prng.rand(-10,10));
							}
						}}> 
							Рандомнуть
						</Button>
					</Div>
				<Group title='Docs and sucks'>
					<Div>
						<Button  size="xl" level="2" onClick={() =>{
							this.props.dispatch(fetchDocs());
						}}> 
							Чекнуть доки
						</Button>
					</Div>
					<List>
						{ this.props.userDocs && this.props.userDocs.response.hasOwnProperty('items') && this.props.userDocs.response.items.map((doc, index)=>{
							return(
								<Cell key={index} href={doc.url} before={<Avatar size={24}><Icon24Document width='14' height='14' /></Avatar>}>
									{doc.title}
								</Cell>
							)
						})}
					</List>
				</Group>
				<Modal />
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
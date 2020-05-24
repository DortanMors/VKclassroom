import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import List from '@vkontakte/vkui/dist/components/List/List'
import Modal from '../Modal'
import Icon24Document from '@vkontakte/icons/dist/24/document';

const Home = ({ id, go, fetchedUser, token, docs}) => {

	console.log(docs);
	return (
	<Panel id={id}>
		<PanelHeader>VK classroom</PanelHeader>
		{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}
		<Group title='Docs and sucks'>
			<Button  size="xl" level="2" onClick={() =>{
				
			}}> Чекнуть доки </Button>
		</Group>
		<List>
			{ docs.response.hasOwnProperty('items') && docs.response.items.map((doc, index)=>{
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

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import '../img/persik.png'

const Home = ({ id, go, fetchedUser }) => {
	state = {
		isPersikOpen: false
	}

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

		<Group title="Navigation Example">
			<Div>
				<Button size="xl" level="2" onClick={() => this.setState({isOpen:true})} data-to="persik">
					Show me the Persik, please
				</Button>
				
					

			</Div>
		</Group>

		<React.Fragment>
                {this.state.isOpen && 
                    (<div className='modal'>
                        <div className='modal-body'>
                            <h1>Persik</h1>
                            <Avatar src='./img/persik.png' />
                            <button onClick={() => this.setState({isOpen:false})}>Close persik</button>
                        </div>
                    </div>)
                }
        </React.Fragment>
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
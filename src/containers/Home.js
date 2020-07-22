import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Panel, PanelHeader, Group, RichCell, Avatar, List, Div } from '@vkontakte/vkui';
import { setModal } from '../store/vk/actions';

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
								<RichCell
									before={<Avatar size={48} src={card.photo?card.photo:""} />}
									caption={card.formatted_address}
									text={card.opening_hours.open_now?"Открыто":"Закрыто"}
									after={'★'+card.rating}
									key={i}
									onClick={() => this.props.dispatch(setModal("card", i))}
								>{card.name}</RichCell>
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
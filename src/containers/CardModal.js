import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ModalRoot, ModalPage } from '@vkontakte/vkui';
import { getModalStatus, getSelectedCard, getSelected } from '../store/reducers/cardState';
import { setModal } from '../store/vk/actions';
import Carousel from 'nuka-carousel';

class CardModal extends Component {
    render(){
        let card = {};
        if (this.props.modalStatus){
            card = [...this.props.selected][this.props.selectedCard];
        }
        return(this.props.modalStatus &&
            <ModalRoot activeModal={this.props.modalStatus} onClose={() => this.props.dispatch(setModal(null, 0))}>
                <ModalPage id="card">
                    <div className="card">
						<Carousel>
							<img src={card.photo} alt="businessPicture" />
						</Carousel>
						<h2>{card.name}</h2>
                        <h5>{'★'+card.rating} {card.opening_hours.open_now?"Открыто":"Закрыто"}</h5>
						<h5>{card.formatted_address}</h5>
					</div>
                </ModalPage>
            </ModalRoot>
        )
    }
}


function mapStateToProps(state) {
    return {
        modalStatus:  getModalStatus(state),
        selectedCard: getSelectedCard(state),
        selected:     getSelected(state)
	};
}

export default connect(mapStateToProps)(CardModal);
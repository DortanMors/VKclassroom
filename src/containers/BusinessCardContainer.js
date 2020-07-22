import React, { Component } from 'react';
import {connect} from 'react-redux';

import { animated, interpolate } from "react-spring";
import Carousel from "nuka-carousel";
import { getCards, getIsCardsOver, getSelected} from '../store/reducers/cardState';

class BusinessCardContainer extends Component {

	render() {
		const card = this.props.cards[this.props.i];
		return(
			<animated.div
				key={this.props.i}
				className='firstanimateddiv'
				style={{
					transform: interpolate([this.props.x, this.props.y], (x, y) => `translate3d(${x}px,${y}px,0)`)
				}}
				>
				<animated.div
					{...this.props.bind(this.props.i)}
					className='secondanimateddiv'
					style={{
					transform: interpolate([this.props.rot, this.props.scale], this.props.trans)
					}}
				>
					<div className="card">
						<Carousel>
							<img src={card.photo} alt="businessPicture" />
						</Carousel>
						<h2>{card.name}</h2>
						<h5>{'★'+card.rating} {card.opening_hours.open_now?"Открыто":"Закрыто"}</h5>
						<h5>{card.formatted_address}</h5>
					</div>
				</animated.div>
			</animated.div>
		);
	};
};

function mapStateToProps(state) {
    return {
        cards:       getCards(state),
        isCardsOver: getIsCardsOver(state),
        selected:    getSelected(state)
	};
}

export default connect(mapStateToProps)(BusinessCardContainer);
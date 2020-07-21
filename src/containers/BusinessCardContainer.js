import React, { Component } from 'react';
import {connect} from 'react-redux';

import { animated, interpolate } from "react-spring";
import Carousel from "nuka-carousel";
import { getCards, getIsCardsOver, getGone, getSelected} from '../store/reducers/cardState';

class BusinessCardContainer extends Component {

	render() {
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
							<img src={this.props.cards[this.props.i].photo} alt="businessPicture" />
						</Carousel>
						<h2>{this.props.cards[this.props.i].name}</h2>
						<h5>{this.props.cards[this.props.i].rating}</h5>
						<h5>{this.props.cards[this.props.i].formatted_address}</h5>
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
        gone:        getGone(state),
        selected:    getSelected(state)
	};
}

export default connect(mapStateToProps)(BusinessCardContainer);
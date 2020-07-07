import React, { Component } from 'react';
import {connect} from 'react-redux';

import { animated, interpolate } from "react-spring";
import Carousel from "nuka-carousel";

class BusinessCardContainer extends Component {

	render() {
		return(
			<animated.div
				key={this.props.key}
				style={{
					transform: interpolate([this.props.x, this.props.y], (x, y) => `translate3d(${x}px,${y}px,0)`)
				}}
				>
				<animated.div
					{...this.props.bind(this.props.i)}
					style={{
					transform: interpolate([this.props.rot, this.props.scale], this.props.trans)
					}}
				>
					<div className="card">
					<Carousel>
						{this.props.data.pics.map((pic, index) => (
							<img src={pic} key={index} alt="businessPicture" />
						))}
					</Carousel>
					<h2>{this.props.data.title}</h2>
					<h5>{this.props.data.info.distance} км</h5>
					<h5>{this.props.data.info.text}</h5>
					</div>
				</animated.div>
			</animated.div>
		);
	};
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(BusinessCardContainer);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Stage, Container, TilingSprite } from '@inlet/react-pixi';
import Persik from '../img/persik.png';
import { Touch } from '@vkontakte/vkui';
import { setContainerPos } from '../store/vk/actions';

class GamePanel extends Component {

	render() {
		return(
			<div style={{
				display: 'flex',
				alignContent: 'center',
				justifyContent: 'center'
			}} >
			<Touch
				onMove={(e)=>{
					console.log(e);
					const pos = {
						x: this.props.containerPos.x + e.originalEvent.movementX,
						y: this.props.containerPos.y + e.originalEvent.movementY
					};
					this.props.dispatch(setContainerPos(pos));
				}}
			>
				<Stage
					width={630}
					height={500}
					options={{ backgroundColor: 0xff1dd300 }}
				>
					<Container
						x={this.props.containerPos.x}
						y={this.props.containerPos.y}
						width={this.props.city.N * this.props.cityParameters.tile_width}
						height={this.props.city.M * this.props.cityParameters.tile_height}
					>
						<TilingSprite
							image={Persik}
							width={this.props.city.N * this.props.cityParameters.tile_width}
							height={this.props.city.M * this.props.cityParameters.tile_height}
							tilePosition={{ x: 25, y: 25 }}
							tileScale={{ x: this.props.cityParameters.tile_width/512, 
										y: this.props.cityParameters.tile_height/512 }}
						/>
						
					</Container>
				</Stage>
			</Touch>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(GamePanel);
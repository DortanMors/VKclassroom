import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Stage, Container, TilingSprite, Sprite } from '@inlet/react-pixi';
import { Touch, PanelHeader, Panel } from '@vkontakte/vkui';
import { setContainerPos, setPrevContainerPos } from '../store/vk/actions';
import Grass from '../img/grass.png';
import Road from '../img/road.png'

class GamePanel extends Component {

	render() {
		return(
			<Panel
				id={this.props.id}
				style={{
				display: 'flex',
				alignContent: 'center',
				justifyContent: 'center'
			}} >
			<PanelHeader>{this.props.prevContainerPos.x} {this.props.prevContainerPos.y} | {this.props.containerPos.x} {this.props.containerPos.y}</PanelHeader>
				<Touch
					onStart={(e) => this.props.dispatch(setPrevContainerPos(this.props.containerPos))}
					onMove={(e)=>{
						console.log(e);
						const pos = {
							x: this.props.prevContainerPos.x + e.shiftX,
							y: this.props.prevContainerPos.y + e.shiftY
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
								image={Grass}
								width={this.props.city.N * this.props.cityParameters.tile_width}
								height={this.props.city.M * this.props.cityParameters.tile_height}
								tilePosition={{ x: 25, y: 25 }}
								tileScale={{ x: this.props.cityParameters.tile_width/512, 
											 y: this.props.cityParameters.tile_height/512}}
							/>
							{this.props.roads.map((road, index)=>{
								return(
									<Sprite
										key={index}
										image={Road}
										width={road.isVertical? this.props.cityParameters.tile_width/5 : this.props.cityParameters.tile_width}
										height={road.isVertical? this.props.cityParameters.tile_height : this.props.cityParameters.tile_height/5}
										x={road.n * this.props.cityParameters.tile_width + this.props.cityParameters.tile_width/2}
										y={road.m * this.props.cityParameters.tile_height + this.props.cityParameters.tile_height/2}
									/>
								);
							})}
						</Container>
					</Stage>
				</Touch>
			</Panel>
		);
	}
}

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(GamePanel);
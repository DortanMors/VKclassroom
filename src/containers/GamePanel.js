import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Stage, Container, TilingSprite, Sprite } from '@inlet/react-pixi';
import { Touch, PanelHeader, Panel } from '@vkontakte/vkui';
import { setDirByMove, updateTick } from '../store/vk/actions';
import Grass from '../img/grass.png';
import Road from '../img/road.png'
import Persik from '../img/persik.png'

class GamePanel extends Component {

	render() {
		this.props.dispatch(updateTick(
			this.props.city,
			this.props.dudePos,
			this.props.dudePath,
			this.props.dudeCurDir,
			this.props.dudeNewDir
		));
		return(
			<Panel
				id={this.props.id}
				style={{
				display: 'flex',
				alignContent: 'center',
				justifyContent: 'center'
			}} >
			<PanelHeader>{this.props.dudeCurDir} {this.props.dudeNewDir}</PanelHeader>
				<Touch
					onMove={(e)=>{
						this.props.dispatch(setDirByMove(e));
					}}
				>
					<Stage
						width={this.props.city.N * this.props.cityParameters.tile_width}
						height={this.props.city.M * this.props.cityParameters.tile_height}
						options={{ backgroundColor: 0xffe667af }}
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
							<Sprite
								image={Persik}
								width={this.props.cityParameters.tile_width/5}
								height={this.props.cityParameters.tile_height/5}
								x={this.props.dudePos.x * this.props.cityParameters.tile_width + this.props.cityParameters.tile_width/2 + (this.props.dudePath.x*this.props.cityParameters.tile_width)}
								y={this.props.dudePos.y * this.props.cityParameters.tile_height + this.props.cityParameters.tile_height/2 + (this.props.dudePath.y*this.props.cityParameters.tile_height)}
							/>
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
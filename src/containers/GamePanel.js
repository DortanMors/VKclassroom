import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Stage, Container, TilingSprite } from '@inlet/react-pixi';
import Persik from '../img/persik.png';
import { Touch, PanelHeader, Panel } from '@vkontakte/vkui';
import { setContainerPos, setPrevContainerPos } from '../store/vk/actions';

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
								image={Persik}
								width={this.props.city.N * this.props.cityParameters.tile_width}
								height={this.props.city.M * this.props.cityParameters.tile_height}
								tilePosition={{ x: 25, y: 25 }}
								tileScale={{ x: this.props.cityParameters.tile_width/512, 
											 y: this.props.cityParameters.tile_height/512}}
							/>
							{this.props.city.nodes.filter((node, index)=>{
								return(
									<Sprite
										key={index}
										image={Persik}
										width={1? 1 : this.props.cityParameters.tile_width}
										height={1? 1 : this.props.cityParameters.tile_height}
										x={(index - index % this.props.city.N)/this.props.city.N * this.props.cityParameters.tile_width/512 + this.props.cityParameters.tile_width/1024}
										y={index % this.props.city.N * this.props.cityParameters.tile_height/512 + this.props.cityParameters.tile_height/1024}
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
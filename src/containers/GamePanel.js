import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Stage, Sprite, Container } from '@inlet/react-pixi';
import Persik from '../img/persik.png'

class GamePanel extends Component {

	render() {
		return(
			<div style={{
				display: 'flex',
				alignContent: 'center',
				justifyContent: 'center'
			}} >
			<Stage 
				width={this.props.city.N * this.props.cityParameters.tile_width}
				height={this.props.city.M * this.props.cityParameters.tile_height}
				options={{ backgroundColor: 0xffffffff }}
			>
				<Container>
					{this.props.city.nodes.map((node, index)=>{
							return(
								<Sprite 
									anchor={0.5}
									key={index} 
									image={Persik}
									width={this.props.cityParameters.tile_width}
									height={this.props.cityParameters.tile_height}
									x={(index % this.props.city.M) * this.props.cityParameters.tile_width}
									y={(index % this.props.city.N) * this.props.cityParameters.tile_height}
								/>
							);
						})
					}
				</Container>
			</Stage>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(GamePanel);
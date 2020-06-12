import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Stage, Sprite } from '@inlet/react-pixi';
import Persik from '../img/persik.png'

class GamePanel extends Component {

	render() {
		// this.props.dispatch(vkActions.setRotation(this.props.rotation+0.1));
		return(
			<div style={{
				display: 'flex',
				alignContent: 'center',
				justifyContent: 'center'
			}} >
			<Stage 
			width={300} height={300} options={{ backgroundColor: 0xffffffff }}>
				<Sprite 
					image={Persik}
					scale={{ x: 0.2, y: 0.2 }}
					anchor={0.5}
					x={150}
					y={175}
					rotation={this.props.rotation}
				/>
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
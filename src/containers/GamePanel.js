import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setGame} from '../store/vk/actions';
import { GLView } from 'expo-gl'
import ExpoPixi from 'expo-pixi'

class GamePanel extends React.Component {

	render() {

		return(
			<GLView
				style={{flex:1}}
				onContextCreate={context => {
					const app = ExpoPixi.application({context});
					const persik = ExpoPixi.sprite('../../img/persik.png');
					app.stage.addChild(persik);
					persik.anchor.set(0.5);
					persik.x = app.screen.width/2;
					persik.y = app.screen.height/2;
					app.ticker.add(()=> persik.rotation += 0.03);
					this.props.dispatch(setGame(app));
				}}
			/>
		);
	}
}

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(GamePanel);
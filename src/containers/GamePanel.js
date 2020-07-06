import React, { Component } from 'react';
import {connect} from 'react-redux';
import { PanelHeader, Panel } from '@vkontakte/vkui';

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
			<PanelHeader>Эту панель пока не убрать</PanelHeader>
				
			</Panel>
		);
	}
}

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(GamePanel);
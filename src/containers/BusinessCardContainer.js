import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Div } from '@vkontakte/vkui';

class BusinessCardContainer extends Component {

	render() {
		return(
			<Div>

            </Div>
		);
	}
}

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(BusinessCardContainer);
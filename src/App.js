import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Root, ConfigProvider } from '@vkontakte/vkui';
import { RouteNode } from 'react-router5'
import * as vkActions from './store/vk/actions';
import * as vkSelectors from './store/vk/reducers'
import Home from './panels/Home';
import Intro from './panels/Intro';

import '@vkontakte/vkui/dist/vkui.css';

class App extends Component{
	componentWillMount() {
		this.props.dispatch(vkActions.initApp());
        //this.props.dispatch(vkActions.fetchData(this.props.store.appState.storageKeys));
        this.props.dispatch(vkActions.fetchData({STATUS: 'status'}));
		this.props.dispatch(vkActions.fetchDocs());
	}
	
	render(){
		let activePanel = this.props.route.name === 'intro' ? 'introPanel' : 'homePanel';

		return(
			<ConfigProvider insets={this.props.insets}>
                <Root activeView="mainView">
                    <View id="mainView" activePanel={activePanel} popout={this.props.store.appState.popout}>
                        <Home router={this.props.router} id="homePanel" accessToken={this.accessToken}/>
                        <Intro router={this.props.router} id="introPanel"/>
                    </View>
                </Root>
            </ConfigProvider>
		);
	}
}


function mapStateToProps(state) {
    return {
        //accessToken: vkSelectors.getAccessToken(state),
        //insets: vkSelectors.getInsets(state)
    };
}

export default connect(mapStateToProps)(
    (props) => (
        <RouteNode nodeName="">
            {({ route }) => <App route={route} {...props}/>}
        </RouteNode>
    )
);
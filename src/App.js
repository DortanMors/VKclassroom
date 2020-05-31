import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Root, ConfigProvider } from '@vkontakte/vkui';
import { RouteNode } from 'react-router5'
import * as vkActions from './store/vk/actions';
import * as selectors from './store/reducers/appState'
import Home from './containers/Home';
import Intro from './containers/Intro';

import '@vkontakte/vkui/dist/vkui.css';

class App extends Component{
	componentDidMount() {
		this.props.dispatch(vkActions.initApp());
        //this.props.dispatch(vkActions.fetchData(this.props.store.appState.storageKeys));
        this.props.dispatch(vkActions.fetchData({STATUS: 'status'}));
	}
	
	render(){
        this.props.route.name = this.props.userSawIntro? 'home' : 'intro';
		let activePanel = this.props.route.name === 'intro' ? 'introPanel' : 'homePanel';

		return(
			<ConfigProvider>
                <Root activeView="mainView">
                    <View id="mainView" activePanel={activePanel} popout={this.props.popout}>
                        <Home 
                            router={this.props.router}
                            id="homePanel"
                            accessToken={this.props.accessToken}
                            userDocs={this.props.userDocs}
                            userInfo={this.props.userInfo}
                        />
                        <Intro 
                            router={this.props.router}
                            id="introPanel"
                            userSawIntro={this.props.userSawIntro}
                            storageKeys={this.props.storageKeys}
                            snackbar={this.props.snackbar}
                        />
                    </View>
                </Root>
            </ConfigProvider>
		);
	}
}


function mapStateToProps(state) {
    return {
        accessToken: selectors.getAccessToken(state),
        popout: selectors.getPopout(state),
        userDocs: selectors.getUserDocs(state),
        userInfo: selectors.getUserInfo(state),
        userSawIntro: selectors.getUserSawIntro(state),
        storageKeys: selectors.getStorageKeys(state),
        snackbar: selectors.getSnackbar(state)
    };
}

export default connect(mapStateToProps)(
    (props) => (
        <RouteNode nodeName="">
            {({ route }) => <App route={route} {...props}/>}
        </RouteNode>
    )
);
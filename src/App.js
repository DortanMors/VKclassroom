import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Epic, ConfigProvider } from '@vkontakte/vkui';
import { RouteNode } from 'react-router5'
import * as vkActions from './store/vk/actions';
import * as selectors from './store/reducers/appState';
import * as gameSelectors from './store/reducers/gameState';
import Home from './containers/Home';
import GamePanel from './containers/GamePanel';
import Intro from './containers/Intro';
import Footer from './containers/Footer';
import create_city from './City/create-city';

import '@vkontakte/vkui/dist/vkui.css';
class App extends Component{
	componentDidMount() {
        this.props.dispatch(vkActions.initApp());
        this.props.dispatch(vkActions.fetchData(this.props.storageKeys, create_city));
	}
	
	render(){
		let activeStory = 'introView';
        
        switch(this.props.route.name){
            case 'intro':
                activeStory = 'introView';
                break;
            case 'home':
                activeStory = 'homeView';
                break;
            case 'game':
                activeStory = 'gameView';
                break;
            default:
                break;
        }

		return(
			<ConfigProvider>
                <Epic 
                    activeStory={activeStory}
                    tabbar={<Footer 
                        route={this.props.route}
                        router={this.props.router}
                        open={this.props.router.navigate}
                        onTransition={()=> console.log('Переключено!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')}
                    />}
                >
                    <View id="homeView" activePanel="homePanel" popout={this.props.popout}>
                        <Home 
                            router={this.props.router}
                            id="homePanel"
                            accessToken={this.props.accessToken}
                            userDocs={this.props.userDocs}
                            userInfo={this.props.userInfo}
                        />
                    </View>
                    <View id="gameView" activePanel="gamePanel" popout={this.props.popout}>
                        <GamePanel 
                            router={this.props.router}
                            id="gamePanel"
                            rotation={this.props.rotation}
                            city={this.props.city}
                            cityParameters={this.props.cityParameters}
                        />
                    </View>
                    <View id="introView" activePanel="introPanel" popout={this.props.popout}>
                        <Intro 
                            router={this.props.router}
                            id="introPanel"
                            userSawIntro={this.props.userSawIntro}
                            userInfo={this.props.userInfo}
                            storageKeys={this.props.storageKeys}
                            snackbar={this.props.snackbar}
                        />
                    </View>
                </Epic>
            </ConfigProvider>
		);
    }
    
    openHome() {
        this.props.router.navigate('home');
    }

    openIntro() {
        this.props.router.navigate('intro');
    }
}


function mapStateToProps(state) {
    return {
        accessToken:  selectors.getAccessToken(state),
        popout:       selectors.getPopout(state),
        userDocs:     selectors.getUserDocs(state),
        userInfo:     selectors.getUserInfo(state),
        userSawIntro: selectors.getUserSawIntro(state),
        storageKeys:  selectors.getStorageKeys(state),
        snackbar:     selectors.getSnackbar(state),

        rotation: gameSelectors.getRotation(state),
        city:     gameSelectors.getCity(state),
        cityParameters: gameSelectors.getCityParameters(state)
    };
}

export default connect(mapStateToProps)(
    (props) => (
        <RouteNode nodeName="">
            {({ route }) => <App route={route} {...props}/>}
        </RouteNode>
    )
);
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Epic, ConfigProvider } from '@vkontakte/vkui';
import { RouteNode } from 'react-router5'
import * as vkActions from './store/vk/actions';
import * as selectors from './store/reducers/appState';
import * as cardSelectors from './store/reducers/cardState'
import Home from './containers/Home';
import GamePanel from './containers/GamePanel';
import Intro from './containers/Intro';
import Footer from './containers/Footer';

import '@vkontakte/vkui/dist/vkui.css';
class App extends Component{
	componentDidMount() {
        this.props.dispatch(vkActions.initApp());
        this.props.dispatch(vkActions.fetchData(this.props.storageKeys));
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
                            selected={this.props.selected}
                        />
                    </View>
                    <View id="gameView" activePanel="gamePanel" popout={this.props.popout}>
                        <GamePanel 
                            router={this.props.router}
                            id="gamePanel"

                            userInfo={this.props.userInfo}
                            cards={this.props.cards}
                            isCardsOver={this.props.isCardsOver}
                            gone={this.props.gone}
                            number={this.props.number}
                            selected={this.props.selected}
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

        cards:        cardSelectors.getCards(state),
        isCardsOver:  cardSelectors.getIsCardsOver(state),
        gone:         cardSelectors.getGone(state),
        number:       cardSelectors.getNumber(state),
        selected:     cardSelectors.getSelected(state)
    };
}

export default connect(mapStateToProps)(
    (props) => (
        <RouteNode nodeName="">
            {({ route }) => <App route={route} {...props}/>}
        </RouteNode>
    )
);
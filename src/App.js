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
import CardModal from './containers/CardModal';
class App extends Component{
	componentDidMount() {
        this.props.dispatch(vkActions.initApp());
        this.props.dispatch(vkActions.fetchData(this.props.storageKeys, this.props.router.navigate));
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
                    <View id="homeView" activePanel="homePanel" popout={this.props.popout}
                          modal={<CardModal modalStatus={this.props.modalStatus} selectedCard={this.props.selectedCard} selected={this.props.selected}/>}>
                        <Home 
                            router={this.props.router}
                            id="homePanel"

                            accessToken={this.props.accessToken}
                            userInfo={this.props.userInfo}
                            selected={this.props.selected}
                        />
                    </View>
                    <View id="gameView" activePanel="gamePanel" popout={this.props.popout}>
                        <GamePanel 
                            router={this.props.router}
                            id="gamePanel"

                            userInfo={this.props.userInfo}
                            nextPage={this.props.nextPage}
                            cards={this.props.cards}
                            isCardsOver={this.props.isCardsOver}
                            gone={this.props.gone}
                            number={this.props.number}
                            selected={this.props.selected}
                            cityParam={this.props.cityParam}
                            searchParam={this.props.searchParam}
                            prevSearch={this.props.prevSearch}
                            deckNum={this.props.deckNum}
                        />
                    </View>
                    <View id="introView" activePanel="introPanel" popout={this.props.popout}>
                        <Intro 
                            router={this.props.router}
                            id="introPanel"
                            popout={this.props.popout}
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
}


function mapStateToProps(state) {
    return {
        accessToken:  selectors.getAccessToken(state),
        popout:       selectors.getPopout(state),
        userInfo:     selectors.getUserInfo(state),
        userSawIntro: selectors.getUserSawIntro(state),
        storageKeys:  selectors.getStorageKeys(state),
        snackbar:     selectors.getSnackbar(state),

        nextPage:     cardSelectors.getNextPage(state),
        cards:        cardSelectors.getCards(state),
        isCardsOver:  cardSelectors.getIsCardsOver(state),
        selected:     cardSelectors.getSelected(state),
        cityParam:    cardSelectors.getCityParam(state),
        searchParam:  cardSelectors.getSearchParam(state),
        prevSearch:   cardSelectors.getPrevSearch(state),
        deckNum:      cardSelectors.getDeckNum(state),
        modalStatus:  cardSelectors.getModalStatus(state),
        selectedCard: cardSelectors.getSelectedCard(state)
    };
}

export default connect(mapStateToProps)(
    (props) => (
        <RouteNode nodeName="">
            {({ route }) => <App route={route} {...props}/>}
        </RouteNode>
    )
);
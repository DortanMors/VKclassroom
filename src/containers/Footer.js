import React, { Component } from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import {connect} from 'react-redux';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import Icon28Game from '@vkontakte/icons/dist/28/game';
import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';

import '@vkontakte/vkui/dist/vkui.css';

class Footer extends Component {

    render() {
        return (
            <Tabbar>
                <TabbarItem 
                    text="Главная"
                    selected={this.props.route.name==='home'? true : false}
                    onClick={() => {
                        if(this.props.route.name!=='home')
                            this.props.router.navigate('home',{},{replace:true});
                        }
                    }
                >
                    <Icon28HomeOutline />
                </TabbarItem>
                <TabbarItem 
                    text="Погнали"
                    selected={this.props.route.name==='game'? true : false}
                    onClick={() => {
                        if(this.props.route.name!=='game')
                            this.props.router.navigate('game',{},{replace:true});
                        }
                    }
                >
                    {this.props.route.name==='game'? <Icon28GameOutline /> : <Icon28Game /> }
                </TabbarItem>
                <TabbarItem 
                    text="О приложении"
                    selected={this.props.route.name==='intro'? true : false}
                    onClick={() => {
                        if(this.props.route.name!=='intro')
                            this.props.router.navigate('intro',{},{replace:true});
                        } 
                    }
                    >
                    <Icon28InfoOutline />
                </TabbarItem>
            </Tabbar>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Footer);
import React from 'react'
import './Modal.css'
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Persik from './img/persik.png'
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

export default class Modal extends React.Component{
    state = {
        isOpen: false
    }
    render(){
        return(
            <React.Fragment>
                <Group title='Showing Persik'>
                    <Div>
                        <Button size="xl" level="2" onClick={() => this.setState({isOpen:true})} data-to="persik">
                            Show me the Persik, please
                        </Button>
                        {this.state.isOpen && 
                            (<div className='modal'>
                                <div className='modal-body'>
                                    <h1>Persik</h1>
                                    <img src={Persik} alt='Persik' style={{width:100, height:100}} />
                                    <Button size="xl" level="2" onClick={() => this.setState({isOpen:false})}>Close persik</Button>
                                </div>
                            </div>)
                        }
                    </Div>
                </Group>
            </React.Fragment>
        )
    }
}
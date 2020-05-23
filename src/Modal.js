import React from 'react'
import './Modal.css'
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar'

export default class Modal extends React.Component{
    state = {
        isOpen: false
    }
    render(){
        return(
            <React.Fragment>
                <button onClick={() => this.setState({isOpen=true})} >Open Persik</button>
                {this.state.isOpen && 
                    (<div className='modal'>
                        <div className='modal-body'>
                            <h1>Persik</h1>
                            <Avatar src='./img/persik.png' />
                            <button onClick={() => this.setState({isOpen=true})}>Close persik</button>
                        </div>
                    </div>)
                }
            </React.Fragment>
        )
    }
}
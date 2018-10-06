import React, {Component} from 'react';
import {Input} from 'reactstrap'

class InputArea extends Component {
    render() {
        return (
            <Input type='textarea' placeholder={this.props.content}/>
        )
    }
}

export default InputArea

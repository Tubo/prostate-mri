import React, {Component} from 'react';
import {Input} from 'reactstrap'

import ProstateSize from './ProstateSize'


class ClinicalField extends Component {
    render() {
        return (
            <>
                <InputArea content='Clinical History'/>
                <br/>
                <InputArea content='Biopsy summary'/>
                <br/>
                <ProstateSize/>
                <br/>
            </>
        )
    }
}

class InputArea extends Component {
    render() {
        return (
            <Input type='textarea' placeholder={this.props.content}/>
        )
    }
}


export default ClinicalField

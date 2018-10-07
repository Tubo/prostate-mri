import React, {Component} from 'react';
import {Input} from 'reactstrap'

import ProstateSize from './ProstateSize'


class ClinicalField extends Component {
    render() {
        return (
            <>
                <TextArea placeholder='Clinical History'
                          onTextChange={this.props.onHistoryChange}/>
                <br/>
                <TextArea placeholder='Biopsy summary'
                          onTextChange={this.props.onBiopsyChange}/>
                <br/>
                <ProstateSize volume={this.props.volume}
                              onDimChange={this.props.onDimChange}/>
                <br/>
            </>
        )
    }
}

class TextArea extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let content = e.target.value;
        this.props.onTextChange(content)
    }

    render() {
        return (
            <Input type='textarea' placeholder={this.props.placeholder}
                   value={this.props.content} onChange={this.handleChange}/>
        )
    }
}


export default ClinicalField

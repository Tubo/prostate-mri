import React, {Component} from 'react';

import TextArea from './components/TextArea'


class ClinicalContent extends Component {
    render() {
        return (
            <>
                <TextArea placeholder='Clinical History'
                          onTextChange={this.props.onHistoryChange}/>
                <br/>
                <TextArea placeholder='Biopsy summary'
                          onTextChange={this.props.onBiopsyChange}/>
                <br/>
            </>
        )
    }
}


export default ClinicalContent

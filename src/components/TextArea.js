import React, {Component} from 'react'
import {Input} from 'reactstrap'


class TextArea extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTextChange(e.target.value, this.props.type)
    }

    render() {
        return (
            <Input type='textarea'
                   placeholder={this.props.placeholder}
                   rows={this.props.rows || "3"}
                   value={this.props.content}
                   onChange={this.handleChange}
                   className="mb-2"
            />
        )
    }
}

export default TextArea

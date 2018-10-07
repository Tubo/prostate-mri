import React, {Component} from 'react';
import {Row, Col, Input} from 'reactstrap'

class ProstateSize extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        let target = e.target;
        this.props.onDimChange('dim_' + target.name, target.value);

    }

    render() {
        return (
            <Row form>
                <Col sm={4}>
                    <Input placeholder='X (cm)' name='x' onChange={this.handleChange} />
                </Col>
                <Col sm={4}>
                    <Input placeholder='Y (cm)' name='y' onChange={this.handleChange} />
                </Col>
                <Col sm={4}>
                    <Input placeholder='Z (cm)' name='z' onChange={this.handleChange} />
                </Col>
                <Col>
                    <p>The total prostate volume is {this.props.volume} cm^3</p>
                </Col>
            </Row>
        )
    }
}

export default ProstateSize;

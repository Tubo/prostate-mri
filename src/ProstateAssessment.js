import React, {Component} from 'react';
import {Row, Col, Input} from 'reactstrap'

import TextArea from './components/TextArea'


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
            <>
                <Col sm={2}>
                    <Input placeholder='X (cm)' name='x' onChange={this.handleChange}/>
                </Col>
                <Col sm={2}>
                    <Input placeholder='Y (cm)' name='y' onChange={this.handleChange}/>
                </Col>
                <Col sm={2}>
                    <Input placeholder='Z (cm)' name='z' onChange={this.handleChange}/>
                </Col>
                <Col sm={12} className="align-self-center">
                    <Input plaintext className="text-center">Volume: {this.props.volume || 0}</Input>
                </Col>
            </>
        )
    }
}

class ProstateAssessment extends Component {
    render() {
        return (
            <>
                <Row form>
                    <Col md={6}>
                        <h4 className="text-center">Peripheral zone</h4>
                        <TextArea
                            onTextChange={this.props.onAssessmentChange}
                            type="pz"
                        />
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">Transition zone</h4>
                        <TextArea
                            onTextChange={this.props.onAssessmentChange}
                            type="tz"
                        />
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">Central zone</h4>
                        <TextArea
                            onTextChange={this.props.onAssessmentChange}
                            type="cz"
                        />
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">Stroma</h4>
                        <TextArea
                            onTextChange={this.props.onAssessmentChange}
                            type="as"
                        />
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">Nodes</h4>
                        <TextArea
                            onTextChange={this.props.onAssessmentChange}
                            type="nodes"
                        />
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">Bone marrow</h4>
                        <TextArea
                            onTextChange={this.props.onAssessmentChange}
                            type="marrow"
                        />
                    </Col>
                </Row>
                <Row form className="mb-4 justify-content-center">
                    <ProstateSize volume={this.props.volume} onDimChange={this.props.onDimChange}/>
                </Row>
            </>
        )
    }
}

export default ProstateAssessment;

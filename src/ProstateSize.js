import React, {Component} from 'react';
import {Row, Col, Input} from 'reactstrap'

class ProstateSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: null,
            y: null,
            z: null,
            volume: 0,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        let target = e.target;
        this.setState({
            [target.name]: target.value
        });

        this.setState(state => {
                return {
                    volume: Math.round(state.x * state.y * state.z * 0.52 * 100) / 100
                }
            }
        )
    }

    render() {
        return (
            <Row form>
                <Col sm={4}>
                    <Input placeholder='X (cm)' name='x' onChange={this.handleChange} value={this.state.x}/>
                </Col>
                <Col sm={4}>
                    <Input placeholder='Y (cm)' name='y' onChange={this.handleChange} value={this.state.y}/>
                </Col>
                <Col sm={4}>
                    <Input placeholder='Z (cm)' name='z' onChange={this.handleChange} value={this.state.z}/>
                </Col>
                <Col>
                    <p>The total prostate volume is {this.state.volume} cm^3</p>
                </Col>
            </Row>
        )
    }
}

export default ProstateSize;

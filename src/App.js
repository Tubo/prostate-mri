import React, {Component} from 'react';
import {Container, Row, Col, Input} from 'reactstrap'

import NewLesion from './Lesions'


class App extends Component {
    render() {
        return (
            <Container>
                <h1>Prostate MRI</h1>
                <InputArea content='Clinical History'/>
                <br/>
                <InputArea content='Biopsy summary'/>
                <br/>
                <ProstateSize/>
                <br/>
                <h2>Add a new lesion</h2>
                <NewLesion/>
            </Container>
        );
    }
}

class InputArea extends Component {
    render() {
        return (
            <Input type='textarea' placeholder={this.props.content}/>
        )
    }
}

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


export default App;

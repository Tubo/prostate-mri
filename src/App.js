import React, {Component} from 'react';
import {Container, Row, Col, Input, Button} from 'reactstrap'

import Navbar from './Navbar'
import LesionContent from './Lesions'
import ClinicalContent from './ClinicalField'
import { DocumentDownloadLink } from './DocumentGeneration'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: '',
            biopsy: '',
            dim_x: 0,
            dim_y: 0,
            dim_z: 0,
            lesions: [],
        };

        this.onBiopsyChange = this.onBiopsyChange.bind(this);
        this.onHistoryChange = this.onHistoryChange.bind(this);
        this.onDimChange = this.onDimChange.bind(this);
    }

    onHistoryChange(content) {
        this.setState({
            history: content,
        })
    }

    onBiopsyChange(content) {
        this.setState({
            biopsy: content,
        })
    }

    onDimChange(dim, value) {
        this.setState({
            [dim]: value,
        });

        this.setState(state => {
                return {
                    volume: Math.round(state.dim_x * state.dim_y * state.dim_z * 0.52 * 100) / 100
                }
            }
        )
    }

    render() {
        let handlers = {
            onHistoryChange: this.onHistoryChange,
            onBiopsyChange: this.onBiopsyChange,
            onDimChange: this.onDimChange,
            volume: this.state.volume,
        };
        let content = {
            history: this.state.history,
            biopsy: this.state.biopsy,
        };

        return (
            <>
                <Navbar/>
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <MainContent
                                clinical={handlers}
                                content={content}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

class MainContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let onHistoryChange = this.props.clinical.onHistoryChange,
            onBiopsyChange = this.props.clinical.onBiopsyChange,
            onDimChange = this.props.clinical.onDimChange,
            volume = this.props.clinical.volume;

        return (
            <>
                <ClinicalContent
                    onHistoryChange={onHistoryChange}
                    onBiopsyChange={onBiopsyChange}
                    onDimChange={onDimChange}
                    volume={volume}
                />
                <LesionContent/>
                <DocumentDownloadLink
                    content={this.props.content}
                />
                <Button color="danger">Reset</Button>
            </>
        )
    }
}

export default App;

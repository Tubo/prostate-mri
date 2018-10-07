import React, {Component} from 'react';
import {Container, Row, Col, Input, Button} from 'reactstrap'

import Navbar from './Navbar'
import LesionContent from './Lesions'
import ClinicalContent from './ClinicalField'
import { DocumentDownloadLink } from './DocumentGeneration'


class App extends Component {
    render() {
        return (
            <>
                <Navbar/>
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <MainContent/>
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
        return (
            <>
                <ClinicalContent/>
                <LesionContent/>
                <DocumentDownloadLink/>
                <Button color="danger">Reset</Button>
            </>
        )
    }
}

export default App;

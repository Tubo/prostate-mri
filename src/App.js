import React, {Component} from 'react';
import {Container, Row, Col, Input} from 'reactstrap'

import MyNavbar from './Navbar'
import Sidebar from './Sidebar'
import NewLesion from './Lesions'
import ClinicalField from './ClinicalField'


class App extends Component {
    render() {
        return (
            <>
                <MyNavbar/>
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
    render() {
        return (
            <>
                <ClinicalField/>
                <NewLesion/>
            </>
        )
    }
}

export default App;

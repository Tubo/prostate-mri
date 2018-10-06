import React, {Component} from 'react';
import {Container, Row, Col, Input} from 'reactstrap'

import NewLesion from './Lesions'
import ProstateSize from './ProstateSize'
import ClinicalField from './ClinicalField'


class App extends Component {
    render() {
        return (
            <Container>
                <h1>Prostate MRI</h1>
                <ClinicalField content='Clinical History'/>
                <br/>
                <ClinicalField content='Biopsy summary'/>
                <br/>
                <ProstateSize/>
                <br/>
                <h2>Add a new lesion</h2>
                <NewLesion/>
            </Container>
        );
    }
}

export default App;

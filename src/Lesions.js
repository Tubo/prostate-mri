import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import {Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap'
import ImageMapper from 'react-image-mapper'
import Dropzone from 'react-dropzone'

import schematic from './schematic.png'


class LesionContent extends Component {
    render() {
        let lesions = this.props.lesions.map((lesion) => (
            <Lesion type={lesion.type} key={lesion.id}/>
        ));

        return (
            <>
                {lesions}
                <NewLesion></NewLesion>
            </>
        )
    }
}

class NewLesion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        })
    }

    handleSubmit(e) {
        this.toggle();
        this.props.addLesion();
        e.preventDefault();
    }

    render() {
        // todo: disable closure of modal on clicking
        return (
            <>
                <Button color='primary' onClick={this.toggle}>
                    Add a lesion
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <ModalBody>
                        <Form>
                            <Row className="justify-content-center">
                                <Col lg={4}>
                                    <p>Step 1: select the anatomical location</p>
                                    <SelectLocation/>
                                </Col>
                                <Col>
                                    <p>Step 2: enter the sequence lexicon</p>
                                    <DropdownSelection sequence="T2"/>
                                    <DropdownSelection sequence="ADC"/>
                                    <DropdownSelection sequence="DCE"/>
                                    <DropdownSelection sequence="Total"/>
                                    <YesNoSelection/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <DropImage sequence="T2"/>
                                </Col>
                                <Col>
                                    <DropImage sequence="ADC"/>
                                </Col>
                                <Col>
                                    <DropImage sequence="DCE"/>
                                </Col>
                            </Row>
                            <Button onClick={this.handleSubmit}>Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

class Lesion extends Component {
    render() {
        return (
            <p>I'm a {this.props.type} lesion</p>
        )
    }
}

class DropdownSelection extends Component {
    render() {
        const lexicon = {
            total: {
                1: 'very low (clinically significant cancer is highly unlikely to be present)',
                2: 'low (clinically significant cancer is unlikely to be present',
                3: 'intermediate (the presence of clinically significant cancer is equivocal)',
                4: 'high (clinically significant cancer is likely to be present)',
                5: 'very high (clinically significant cancer is highly likely to be present)',
            },
        };
        return (
            <FormGroup>
                <Label>
                    Please select the {this.props.sequence} description
                </Label>
                <Input type="select">
                    <option>Hello</option>
                    <option>World</option>
                </Input>
            </FormGroup>
        )
    }
}

class YesNoSelection extends Component {
    render() {
        return (
            <FormGroup tag="fieldset">
                <legend>Extracapsular extension</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1"/>{' '}
                        Yes
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1"/>{' '}
                        No
                    </Label>
                </FormGroup>
            </FormGroup>

        )
    }
}


class SelectLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(area) {
        console.log('You have clicked ' + area.name);
        this.setState({
            location: area.name
        })
    }

    render() {
        const MAP = {
            name: 'coord-map',
            areas: [
                {
                    name: 'lASBase',
                    coords: [162, 45, 139, 26, 112, 18, 94, 19, 95, 48, 106, 34, 121, 29, 146, 42, 152, 58],
                    shape: "poly"
                }
            ]
        };

        return (
            <>
                <ImageMapper src={schematic} map={MAP} onClick={this.handleClick}/>
                <p>Location: {this.state.location || 'not selected'}</p>
            </>
        )
    }
}


class DropImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };

        this.onDrop = this.onDrop.bind(this);

    }

    onDrop(files) {
        console.log(files);
        this.setState({
            image: files,
        })
    }

    render() {
        const image = this.state.image;
        if (image) {
            return (
                <Dropzone disableClick={true} onDrop={this.onDrop}>
                    <img src={image[0].preview} width={200} height={200}/>
                </Dropzone>
            )
        } else {
            return (
                <Dropzone disableClick={true} onDrop={this.onDrop}>
                    Please drag and drop the {this.props.sequence} image and enter the image number.
                </Dropzone>
            )
        }
    }
}


export default LesionContent;

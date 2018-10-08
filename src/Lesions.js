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

class Lesion extends Component {
    render() {
        return (
            <p>I'm a {this.props.type} lesion</p>
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
            t2w_pz: {
                1: 'uniform hyperintense signal intensity (normal)',
                2: 'linear or wedge-shaped hypointensity or diffuse mild hypointensity, usually indistinct margin',
                3: 'heterogeneous signal intensity or non-circumscribed, rounded, moderate hypointensity (includes others that do not qualify as 2, 4, or 5)',
                4: 'circumscribed, homogenous moderate hypointensefocus/mass confined to prostate and <1.5 cm in greatest dimension',
                5: 'same as 4 but ≥1.5cm in greatest dimension or definite extraprostatic extension/invasive behavior',
            },
            t2w_tz: {
                1: 'homogeneous intermediate signal intensity (normal)',
                2: 'circumscribed hypointense or heterogeneous encapsulated nodule(s) (BPH)',
                3: 'heterogeneous signal intensity with obscured margins (includes others that do not qualify as 2, 4, or 5)',
                4: 'lenticular or non-circumscribed, homogeneous, moderately hypointense, and <1.5 cm in greatest dimension',
                5: 'same as 4, but ≥1.5cm in greatest dimension or definite extraprostatic extension/invasive behavior',
            },
            dwi: {
                1: 'no abnormality (i.e., normal) on ADC and high b-value DWI',
                2: 'indistinct hypointense on ADC',
                3: 'focal mildly/moderately hypointense on ADC and isointense/mildly hyperintense on high b-valueDWI.',
                4: 'focal markedly hypointense on ADC and markedly hyperintense on high b-value DWI; <1.5cm in greatestdimension',
                5: 'same as 4 but ≥1.5cm in greatest dimension or definite extraprostatic extension/invasive behavior',
            },
            dce: {
                '-': 'no early enhancement, or diffuse enhancement not corresponding to a focal finding on T2W and/or DWI or focal enhancement corresponding to a lesion demonstrating features of BPH on T2WI',
                '+': 'focal, and; earlier than or contemporaneously with enhancement of adjacent normal prostatic tissues, and; correspnds to suspicious finding on T2W and/or DWI',
            }
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

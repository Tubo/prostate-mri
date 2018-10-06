import React, {Component} from 'react';
import {Container, Row, Col, Input, FormGroup, Label} from 'reactstrap'
import {Card, CardBody, CardTitle, CardText, CardImg, CardGroup} from 'reactstrap'
import ImageMapper from 'react-image-mapper'
import Dropzone from 'react-dropzone'

import schematic from './schematic.png'


class NewLesion extends Component {
    render() {
        return (
            <Row>
                <Col sm={12}>
                    <CardGroup>
                        <DropImage sequence="T2"/>
                        <DropImage sequence="ADC"/>
                        <DropImage sequence="DCE"/>
                    </CardGroup>
                </Col>
                <Col sm={4} className="mt-4">
                    <SelectLocation/>
                </Col>
                <Col sm={4} className="mt-4">
                    <DropdownSelection sequence="T2"/>
                    <DropdownSelection sequence="ADC"/>
                    <DropdownSelection sequence="DCE"/>
                    <YesNoSelection/>
                </Col>
            </Row>
        )
    }
}

class DropdownSelection extends Component {
    render() {
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
            <Card className="">
                <ImageMapper src={schematic} map={MAP} onClick={this.handleClick}/>
                <CardBody>
                    <CardText>Location: {this.state.location}</CardText>
                </CardBody>
            </Card>
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
        return (
            <Card body>
                <Dropzone disableClick={true} onDrop={this.onDrop}>
                    <img src={image ? image[0].preview : null} width={200} height={200}/>
                </Dropzone>
                <CardText>{this.props.sequence}
                    <Input placeholder="Sequence number"/>
                </CardText>
            </Card>
        )
    }
}


export default NewLesion;

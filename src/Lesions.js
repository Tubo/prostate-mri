import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import {Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap'
import ImageMapper from 'react-image-mapper'
import Dropzone from 'react-dropzone'

import schematic from './schematic.png'
import {schema_map, lexicon} from './data'

// todo: refactor into better component organisation


export class LesionList extends Component {
    render() {
        return this.props.lesions.map((lesion, idx) => (
            <Lesion lesion={lesion} key={lesion.id} index={idx + 1}/>
        ));
    }
}

class Lesion extends Component {
    constructor(props) {
        super(props);


    }
    render() {
        const lesion = this.props.lesion;

        const zone = lesion.zone,
            scores = lesion.scores,
            extension = lesion.extension,
            comment = lesion.comment,
            images = lesion.images;

        return (
            // todo: different presentation depending on lesion type
            <div>
                <p>Lesion #{this.props.index}</p>
                <ul>
                    <li>Zone: {zone}</li>
                    <li>Extension: {extension}</li>
                    <li>T2W: {scores.t2w}</li>
                    <li>DWI: {scores.dwi}</li>
                    <li>DCE: {scores.dce}</li>
                    <li>Total: {scores.total}</li>
                    <li>Comment: {comment}</li>
                </ul>
                <Button onClick={this.handleClick}>Edit</Button>
            </div>
        )
    }
}


export class NewLesion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            zone: null,
            scores: {
                't2w': 0,
                'dwi': 0,
                'dce': 0,
                'total': 0,
            },
            extension: null,
            comment: "",
            images: [],
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.handleAssessmentChange = this.handleAssessmentChange.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        })
    }

    handleSubmit(e) {
        const lesion = {
            zone: this.state.zone,
            scores: this.state.scores,
            extension: this.state.extension,
            comment: this.state.comment,
            images: this.state.images,
        };

        this.props.addLesion(lesion);

        this.setState({
            modal: false,
            zone: null,
            scores: {
                't2w': 0,
                'dwi': 0,
                'dce': 0,
                'total': 0,
            },
            extension: null,
            comment: "",
            images: [],
        });
        e.preventDefault();
    }

    handleSelectLocation(area) {
        const raw_location = area.name;
        let side, section, zone;

        if (raw_location.indexOf('PZ') !== -1) {
            zone = 'pz'
        } else if (raw_location.indexOf('TZ') !== -1) {
            zone = 'tz'
        } else if (raw_location.indexOf('CZ') !== -1) {
            zone = 'cz'
        } else if (raw_location.indexOf('AS') !== -1) {
            zone = 'as'
        }


        this.setState({
            zone: zone,
            location: raw_location,
        })
    }

    handleAssessmentChange(type, results) {
        if (type.indexOf('t2w') === 0) {
            type = type.slice(0, 3)
        }
        if (type === 'comment' || type === 'extension') {
            this.setState({
                [type]: results,
            })
        } else {
            this.setState(prevState => ({
                scores: {
                    ...prevState.scores,
                    [type]: results,
                }
            }))
        }
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
                                    <SelectLocation onClick={this.handleSelectLocation} location={this.state.location}/>
                                </Col>
                                <Col>
                                    <p>Step 2: enter the sequence lexicon</p>
                                    <LesionAssessment zone={this.state.zone} scores={this.state.scores}
                                                      comment={this.state.comment}
                                                      extension={this.state.extension}
                                                      onChange={this.handleAssessmentChange}/>
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

class LesionAssessment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            't2w_pz': 2,
            'dwi': 3,
            'dce': 1,
            'total': 4,
            'extension': '',
            'comment': '',
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleYesNo = this.handleYesNo.bind(this);
        this.handleComment = this.handleComment.bind(this);

    }

    handleSelect(seq, score) {
        this.props.onChange(seq, score)
    }

    handleYesNo(yes_or_no) {
        this.props.onChange('extension', yes_or_no)
    }

    handleComment(comment) {
        this.props.onChange('comment', comment)
    }

    render() {
        const zone = this.props.zone, scores = this.props.scores;
        const dwi_dce_total = (
            <>
                <DropdownSelection sequence="dwi" value={scores.dwi} handleSelect={this.handleSelect}/>
                <DropdownSelection sequence="dce" value={scores.dce} handleSelect={this.handleSelect}/>
                <DropdownSelection sequence="total" value={scores.total} handleSelect={this.handleSelect}/>
            </>
        );
        const extension_and_comment = (
            <>
                <YesNoSelection value={this.props.extension} handleChange={this.handleYesNo}/>
                <TextArea value={this.props.comment} handleChange={this.handleComment}/>
            </>
        );

        const assessment_categories = {
            pz: (
                <>
                    <DropdownSelection sequence="t2w_pz" value={scores.t2w_pz} handleSelect={this.handleSelect}/>
                    {dwi_dce_total}
                    {extension_and_comment}
                </>
            ),
            tz: (
                <>
                    <DropdownSelection sequence="t2w_tz" value={scores.t2w_tz} handleSelect={this.handleSelect}/>
                    {dwi_dce_total}
                    {extension_and_comment}
                </>
            ),
            cz: extension_and_comment,
            as: extension_and_comment
        };

        if (zone) {
            return assessment_categories[zone];
        }

        return (
            <p>No lesion selected</p>
        )
    }
}


class DropdownSelection extends Component {
    // Sequence (String) Value (Integer)
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.lexicon = lexicon;
    }

    handleChange(e) {
        const target = e.target;

        this.props.handleSelect(this.props.sequence, target.value)
    }

    render() {
        const choices = this.lexicon[this.props.sequence].map((desc, idx) => {
            return (<option key={desc.id} value={idx}>{idx === 0 ? '' : idx + ': '}{desc}</option>);
        });

        return (
            <FormGroup>
                <Label>
                    Please select the {this.props.sequence} description
                </Label>
                <Input type="select" value={this.props.value} onChange={this.handleChange}>
                    {choices}
                </Input>
            </FormGroup>
        )
    }
}

class TextArea extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let content = e.target.value;
        this.props.handleChange(content)
    }

    render() {
        return (
            <FormGroup>
                <Label>Comment
                    <Input type='textarea' placeholder={this.props.placeholder}
                           value={this.props.content} onChange={this.handleChange}/>
                </Label>
            </FormGroup>
        )
    }
}

class YesNoSelection extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

    }

    handleSelect(e) {
        const yes_or_no = e.target.name;
        this.props.handleChange(yes_or_no);
    }

    render() {
        return (
            <FormGroup tag="fieldset">
                <p>Extracapsular extension</p>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="yes" checked={this.props.value === 'yes'}
                               onChange={this.handleSelect}/>{' '}
                        Yes
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="no" checked={this.props.value === 'no'}
                               onChange={this.handleSelect}/>{' '}
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

        this.handleClick = this.handleClick.bind(this);

        this.MAP = schema_map;
    }

    handleClick(area) {
        this.props.onClick(area)
    }

    render() {

        return (
            <>
                <ImageMapper src={schematic} map={this.MAP} onClick={this.handleClick}/>
                <p>Location: {this.props.location || 'not selected'}</p>
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
        // todo: need to uplift the state
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
                <Dropzone disableClick={false}
                          onDrop={this.onDrop}
                          multiple={false}>
                    {this.props.sequence}
                </Dropzone>
            )
        }
    }
}


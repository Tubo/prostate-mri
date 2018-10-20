import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import {Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap'
import ImageMapper from 'react-image-mapper'
import Dropzone from 'react-dropzone'

import schematic from './schematic.png'
import {schema_map, lexicon} from './data'


export class NewLesion extends Component {
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        this.handleAddLesion = this.handleAddLesion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleToggle() {
        this.props.handleToggleModal();
    }

    // todo: move to lesion list
    handleAddLesion() {
        this.props.handleEditLesion(null)
    }

    handleSubmit(e) {
        this.props.handleLesionEdited(this.props.editing.current_lesion_index);
        e.preventDefault();
    }


    render() {
        // todo: disable closure of modal on clicking
        const lesion = this.props.editing.lesion;
        const editing = this.props.editing.current_lesion_index !== null;

        return (
            <>
                <Button color='primary' onClick={this.handleAddLesion}>
                    Add a lesion
                </Button>
                <Modal isOpen={this.props.editing.modal} toggle={this.handleToggle} size="lg">
                    <ModalBody>
                        <Form>
                            <Row className="justify-content-center">
                                <Col lg={4}>
                                    <p>Step 1: select the anatomical location</p>
                                    <SelectLocation onClick={this.props.handleSelectLocation}
                                                    location={lesion.location}/>
                                </Col>
                                <Col>
                                    <p>Step 2: enter the sequence lexicon</p>
                                    <LesionAssessment zone={lesion.zone} scores={lesion.scores}
                                                      comment={lesion.comment}
                                                      extension={lesion.extension}
                                                      onChange={this.props.handleAssessmentChange}/>
                                </Col>
                            </Row>
                            <Row>
                                <ImageUploadContainer handleNewImage={this.props.handleNewImage} lesion={lesion}/>
                            </Row>
                            <Button onClick={this.handleSubmit}>
                                {editing ? 'Save' : 'Add'}
                            </Button>
                            <Button onClick={this.handleToggle}>
                                Cancel
                            </Button>
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
                    <DropdownSelection sequence="t2w_pz" value={scores.t2w} handleSelect={this.handleSelect}/>
                    {dwi_dce_total}
                    {extension_and_comment}
                </>
            ),
            tz: (
                <>
                    <DropdownSelection sequence="t2w_tz" value={scores.t2w} handleSelect={this.handleSelect}/>
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
                           value={this.props.value} onChange={this.handleChange}/>
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

class ImageUploadContainer extends Component {
    render() {
        return (
            ['t2w', 'dwi', 'dce'].map(seq => {
                return (
                    <Col>
                        <ImageUpload sequence={seq}
                                     handleNewImage={(seq, image) => (this.props.handleNewImage(seq, image))}
                                     image={this.props.lesion.images[seq]}
                        />
                    </Col>
                )
            })
        )
    }
}

class ImageUpload extends Component {
    render() {
        const image = this.props.image;

        if (image) {
            return (
                <Dropzone disableClick={true} onDrop={this.onDrop}>
                    <img src={image.preview} width={200} height={200}/>
                </Dropzone>
            )
        } else {
            return (
                <Dropzone disableClick={false}
                          onDrop={(files) => {
                              this.props.handleNewImage(this.props.sequence, files[0])
                          }}
                          multiple={false}>
                    {this.props.sequence}
                </Dropzone>
            )
        }
    }
}


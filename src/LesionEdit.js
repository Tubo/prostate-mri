import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import {Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap'
import ImageMapper from 'react-image-mapper'
import Dropzone from 'react-dropzone'


import schematic from './schematic.png'
import {schema_map, lexicon} from './data'
import TextArea from "./components/TextArea";


export class EditLesion extends Component {
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleToggle() {
        this.props.handleToggleModal();
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
            <Modal isOpen={this.props.editing.modal} toggle={this.handleToggle} size="lg">
                <ModalBody>
                    <Form>
                        <Row className="mb-5">
                            <Col md={4}>
                                <h4 className="text-center mb-4">Step 1: Select location</h4>
                                <SelectLocation onClick={this.props.handleSelectLocation}
                                                location={lesion.location}/>
                            </Col>
                            <Col md={8}>
                                <h4 className="text-center mb-2">Step 2: Score the lesion</h4>
                                <LesionAssessment zone={lesion.zone} scores={lesion.scores}
                                                  comment={lesion.comment}
                                                  extension={lesion.extension}
                                                  onChange={this.props.handleAssessmentChange}/>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                                <h4 className="text-center mb-4">Step 3: Upload images</h4>
                                <Row className="justify-content-center">
                                    <ImageUploadContainer handleNewImage={this.props.handleNewImage}
                                                          handleImageSliceNumber={this.props.handleImageSliceNumber}
                                                          lesion={lesion}/>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={4} className="text-center">
                                <Button onClick={this.handleSubmit}>
                                    {editing ? 'Save' : 'Add'}
                                </Button>
                                <Button onClick={this.handleToggle}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
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
                <Comment value={this.props.comment} handleChange={this.handleComment}/>
            </>
        );

        const assessment_categories = {
            pz: (
                <Col>
                    <DropdownSelection sequence="t2w_pz" value={scores.t2w} handleSelect={this.handleSelect}/>
                    {dwi_dce_total}
                    {extension_and_comment}
                </Col>
            ),
            tz: (
                <Col>
                    <DropdownSelection sequence="t2w_tz" value={scores.t2w} handleSelect={this.handleSelect}/>
                    {dwi_dce_total}
                    {extension_and_comment}
                </Col>
            ),
            cz: (
                <Col>
                    {extension_and_comment}
                </Col>
            ),
            as: (
                <Col>
                    {extension_and_comment}
                </Col>
            )
        };

        if (zone) {
            return (
                <Row>
                    {assessment_categories[zone]}
                </Row>
            )
        }
        ;

        return (
            <p className="text-center">Please select the lesion location first</p>
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

class Comment extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(content, type) {
        this.props.handleChange(content)
    }

    render() {
        return (
            <TextArea placeholder="Comment" content={this.props.value} onTextChange={this.handleChange}/>
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
            <figure className="figure">
                <ImageMapper className="figure-img" src={schematic} map={this.MAP} onClick={this.handleClick}/>
                <figcaption
                    className="figure-caption text-center">Location: {this.props.location || 'not selected'}</figcaption>
            </figure>
        )
    }
}

class ImageUploadContainer extends Component {
    render() {
        return (
            ['t2w', 'dwi', 'dce'].map(seq => {
                return (
                    <Col className="text-center">
                        <div className="ml-3">
                            <ImageUpload sequence={seq}
                                         handleNewImage={(seq, image) => (this.props.handleNewImage(seq, image))}
                                         image={this.props.lesion.images[seq]}
                            />
                        </div>
                        <Input className="w-50 text-center mx-auto my-2" bsSize="sm" placeholder="Slice number"
                               onChange={(e) => this.props.handleImageSliceNumber(seq, e.target.value)}
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
                          multiple={false}
                >
                    <h6 className="text-center h-100"
                        style={{lineHeight: "185px", textTransform: "uppercase"}}>{this.props.sequence}</h6>
                </Dropzone>
            )
        }
    }
}


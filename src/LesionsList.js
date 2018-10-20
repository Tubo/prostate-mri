import React, {Component} from 'react';
import {Row, Col, Media, Button} from 'reactstrap'


export class LesionList extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(idx) {
        this.props.handleEditLesion(idx)
    }

    render() {
        return this.props.lesions.map((lesion, idx) => (
            <Lesion lesion={lesion}
                    key={lesion.id}
                    index={idx}
                    handleEditButton={this.handleClick}
                    handleDeleteButton={(idx) => this.props.handleDeleteLesion(idx)}
            />
        ));
    }
}

class Lesion extends Component {
    constructor(props) {
        super(props);
        this.handleEditButton = this.handleEditButton.bind(this);

    }

    handleEditButton() {
        this.props.handleEditButton(this.props.index);
    }

    render() {
        const lesion = this.props.lesion,
            zone = lesion.zone,
            scores = lesion.scores,
            extension = lesion.extension,
            comment = lesion.comment,
            images = lesion.images;

        return (
            // todo: different presentation depending on lesion type
            <Media list>
                <Col md={4}>
                    <p>Lesion #{this.props.index + 1}</p>
                    <ul>
                        <li>Zone: {zone}</li>
                        <li>Extension: {extension}</li>
                        <li>T2W: {scores.t2w}</li>
                        <li>DWI: {scores.dwi}</li>
                        <li>DCE: {scores.dce}</li>
                        <li>Total: {scores.total}</li>
                        <li>Comment: {comment}</li>
                        <Button color='success' onClick={this.handleEditButton}>Edit</Button>
                        <Button color='danger' onClick={() => this.props.handleDeleteButton(this.props.index)}>Delete</Button>
                    </ul>
                </Col>
                <Col md={8}>
                    {['t2w', 'dwi', 'dce'].map(seq => {
                        let image = images[seq];
                        return (
                            <img src={image ? image.preview : null} width={200}/>
                        )
                    })}
                </Col>
            </Media>
        )
    }
}

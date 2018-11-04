import React, {Component} from 'react';
import {Row, Col, Table, Button} from 'reactstrap'
import placeholder from './placeholder.png'


export class LesionList extends Component {
    render() {
        const lesions = this.props.lesions.map((lesion, idx) => (
            <Lesion lesion={lesion}
                    key={lesion.id}
                    index={idx}
                    handleEditButton={(idx) => this.props.handleEditLesion(idx)}
                    handleDeleteButton={(idx) => this.props.handleDeleteLesion(idx)}
            />
        ));

        return (
            <Table className="mb-5">
                <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th>Zone</th>
                    <th>Scores</th>
                    <th>Extension</th>
                    <th>Total</th>
                    <th>Comment</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {lesions.length > 0 ? lesions : (
                    <tr>
                        <td colSpan={7} className="text-center">Please add a new lesion</td>
                    </tr>
                )}
                </tbody>
            </Table>

        )
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
            images = lesion.images,
            number = lesion.images_number;

        const thumbnails = ['t2w', 'dwi', 'dce'].map(seq => {
            return <SequenceMedia id={seq} image={images[seq]} seq={seq} score={scores[seq]} number={number}/>
        });

        return (
            // todo: different presentation depending on lesion type
            <tr className="text-center">
                <th scope="row">{this.props.index + 1}</th>
                <td>{zone}</td>
                <td>{thumbnails}</td>
                <td>{extension}</td>
                <td>{scores.total}</td>
                <td>{comment}</td>
                <td>
                    <Button color='success' onClick={this.handleEditButton}> Edit </Button>
                    <Button color='danger'
                            onClick={() => this.props.handleDeleteButton(this.props.index)}>Delete</Button>
                </td>
            </tr>
        )
    }
}

function SequenceMedia(props) {
    const image = props.image;
    return (
        <figure className="figure my-0">
            <img className="figure-img img-thumbnail" src={image ? image.preview : placeholder} width={100}/>
            <figcaption className="figure-caption text-center">
                <p className="mt-0 mb-0">{props.id.toUpperCase()}: {props.score}</p>
                <p className="mt-0 mb-0">No. {props.number[props.seq]}</p>
            </figcaption>
        </figure>
    )
}

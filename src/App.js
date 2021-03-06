import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap'

import Navbar from './Navbar'
import {EditLesion} from './LesionEdit'
import {LesionList} from './LesionsList'
import ClinicalContent from './ClinicalContent'
import ProstateAssessment from './ProstateAssessment'
import generateDoc from "./DocumentGeneration"


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: '',
            biopsy: '',
            dim_x: 0,
            dim_y: 0,
            dim_z: 0,
            lesions: [],
            assessments: {},
            editing: {
                modal: false,
                current_lesion_index: null,
                lesion: {
                    zone: null,
                    scores: {
                        't2w': 0,
                        'dwi': 0,
                        'dce': 0,
                        'total': 0,
                    },
                    extension: null,
                    comment: "",
                    images: {},
                    images_number: {},
                }
            },
        };

        this.defaultNewLesion = {
            zone: null,
            scores: {
                't2w': 0,
                'dwi': 0,
                'dce': 0,
                'total': 0,
            },
            extension: null,
            comment: "",
            images: {},
            images_number: {},
        };

        this.onBiopsyChange = this.onBiopsyChange.bind(this);
        this.onHistoryChange = this.onHistoryChange.bind(this);
        this.onAssessmentChange = this.onAssessmentChange.bind(this);
        this.onDimChange = this.onDimChange.bind(this);
        this.handleLesionEdited = this.handleLesionEdited.bind(this);
        this.handleEditLesion = this.handleEditLesion.bind(this);
        this.handleDeleteLesion = this.handleDeleteLesion.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.handleAssessmentChange = this.handleAssessmentChange.bind(this);
        this.handleNewImage = this.handleNewImage.bind(this);
        this.handleImageSliceNumber = this.handleImageSliceNumber.bind(this);
        this.generateDoc = this.generateDoc.bind(this);
    }

    onHistoryChange(content) {
        this.setState({
            history: content,
        });
    }

    onBiopsyChange(content) {
        this.setState({
            biopsy: content,
        })
    }

    onAssessmentChange(content, type) {
        this.setState(prevState => ({
            assessments: {
                ...prevState.assessments,
                [type]: content,
            }
        }))
    }

    onDimChange(dim, value) {
        this.setState({
            [dim]: value,
        });

        this.setState(state => {
                return {
                    volume: Math.round(state.dim_x * state.dim_y * state.dim_z * 0.52 * 10) / 10
                }
            }
        )
    }

    handleToggleModal() {
        this.setState({
            editing: {
                modal: false,
                current_lesion_index: null,
                lesion: this.defaultNewLesion,
            }
        })
    }

    handleAssessmentChange(type, results) {
        if (type.indexOf('t2w') === 0) {
            type = type.slice(0, 3)
        }

        if (type === 'extension' || type === 'comment') {
            this.setState(prevState => ({
                editing: {
                    ...prevState.editing,
                    lesion: {
                        ...prevState.editing.lesion,
                        [type]: results,
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                editing: {
                    ...prevState.editing,
                    lesion: {
                        ...prevState.editing.lesion,
                        scores: {
                            ...prevState.editing.lesion.scores,
                            [type]: results,
                        }
                    },
                }
            }))
        }
    }

//todo change state name to editing
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


        this.setState(prevState => ({
            editing: {
                ...prevState.editing,
                lesion: {
                    ...prevState.editing.lesion,
                    zone: zone,
                    location: raw_location,
                }
            }
        }))
    }

    handleEditLesion(idx) {
        if (idx === null) {
            this.setState({
                editing: {
                    modal: true,
                    current_lesion_index: null,
                    lesion: this.defaultNewLesion,
                }
            });
        } else {
            this.setState(prevState => ({
                editing: {
                    modal: true,
                    current_lesion_index: idx,
                    lesion: prevState.lesions[idx]
                }
            }))
        }
    }

    handleDeleteLesion(idx) {
        let lesions_list = [...this.state.lesions];
        lesions_list.splice(idx, 1);
        this.setState({
            lesions: lesions_list,
        })
    }

    handleLesionEdited(idx) {
        if (idx === null) {
            this.setState(prevState => ({
                lesions: [
                    ...prevState.lesions,
                    prevState.editing.lesion,
                ]
            }))
        } else {
            let lesions_list = [...this.state.lesions];
            lesions_list[idx] = this.state.editing.lesion;

            this.setState({
                lesions: lesions_list,
            })
        }

        this.setState({
            editing: {
                modal: false,
                current_lesion_index: null,
                lesion: this.defaultNewLesion,
            }
        });
    }

    handleNewImage(seq, image) {
        this.setState(prevState => ({
            editing: {
                ...prevState.editing,
                lesion: {
                    ...prevState.editing.lesion,
                    images: {
                        ...prevState.editing.lesion.images,
                        [seq]: image,
                    }
                }
            }
        }))
    }

    handleImageSliceNumber(seq, number) {
        this.setState(prevState => ({
            editing: {
                ...prevState.editing,
                lesion: {
                    ...prevState.editing.lesion,
                    images_number: {
                        ...prevState.editing.lesion.images_number,
                        [seq]: number,
                    }
                }
            }
        }))
    }

    generateDoc() {
        return generateDoc(this.state)
    }

    render() {
        const props = {
            onHistoryChange: this.onHistoryChange,
            onBiopsyChange: this.onBiopsyChange,

            onDimChange: this.onDimChange,
            onAssessmentChange: this.onAssessmentChange,

            handleLesionEdited: this.handleLesionEdited,
            handleEditLesion: this.handleEditLesion,
            handleDeleteLesion: this.handleDeleteLesion,
            handleToggleModal: this.handleToggleModal,
            handleAssessmentChange: this.handleAssessmentChange,
            handleSelectLocation: this.handleSelectLocation,

            handleNewImage: this.handleNewImage,
            handleImageSliceNumber: this.handleImageSliceNumber,

            generateDoc: this.generateDoc,

            volume: this.state.volume,
            lesions: this.state.lesions,
            editing: this.state.editing,
        };

        return (
            <>
                <Navbar/>
                <Container className="mt-4">
                    <MainContent {...props} />
                </Container>
            </>
        );
    }
}

class MainContent extends Component {
    render() {
        const clinical_props = {
            onHistoryChange: this.props.onHistoryChange,
            onBiopsyChange: this.props.onBiopsyChange,
        };

        const prostate_assessment_props = {
            onDimChange: this.props.onDimChange,
            onAssessmentChange: this.props.onAssessmentChange,
            volume: this.props.volume,
        };

        const lesion_list_props = {
            lesions: this.props.lesions,
            handleEditLesion: this.props.handleEditLesion,
            handleDeleteLesion: this.props.handleDeleteLesion,
        };

        const edit_lesion_props = {
            handleLesionEdited: this.props.handleLesionEdited,
            handleToggleModal: this.props.handleToggleModal,
            handleAssessmentChange: this.props.handleAssessmentChange,
            handleSelectLocation: this.props.handleSelectLocation,
            handleNewImage: this.props.handleNewImage,
            handleImageSliceNumber: this.props.handleImageSliceNumber,
            editing: this.props.editing,
        };

        const generateDoc = this.props.generateDoc,
            handleEditLesion = this.props.handleEditLesion;

        return (
            <>
                <h1 className="mb-4">Clinical background</h1>
                <ClinicalContent {...clinical_props} />
                <h1 className="mb-4">Prostate assessment</h1>
                <ProstateAssessment {...prostate_assessment_props} />
                <h1 className="mb-4">List of lesions</h1>
                <LesionList {...lesion_list_props} />

                <EditLesion {...edit_lesion_props} />
                <Row className="justify-content-center mb-5">
                    <Col md={5} className="text-center">
                        <Button color='primary' onClick={() => handleEditLesion(null)}>New lesion</Button>
                        <Button color="success" onClick={() => generateDoc()}>Generate</Button>
                        <Button color="danger">Clear all</Button>
                    </Col>
                </Row>
            </>
        )
    }
}

export default App;

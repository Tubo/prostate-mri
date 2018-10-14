import React, {Component} from 'react';
import {Container, Row, Col, Input, Button} from 'reactstrap'

import Navbar from './Navbar'
import {LesionList, NewLesion} from './Lesions'
import ClinicalContent from './ClinicalField'
import {DocumentDownloadLink} from './DocumentGeneration'


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
                    images: [],
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
            images: [],
        }

        this.onBiopsyChange = this.onBiopsyChange.bind(this);
        this.onHistoryChange = this.onHistoryChange.bind(this);
        this.onDimChange = this.onDimChange.bind(this);
        this.handleLesionEdited = this.handleLesionEdited.bind(this);
        this.handleEditLesion = this.handleEditLesion.bind(this);
        this.handleDeleteLesion = this.handleDeleteLesion.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.handleAssessmentChange = this.handleAssessmentChange.bind(this);
    }

    onHistoryChange(content) {
        this.setState({
            history: content,
        });
        // this.documentTree()
    }

    onBiopsyChange(content) {
        this.setState({
            biopsy: content,
        })
    }

    onDimChange(dim, value) {
        this.setState({
            [dim]: value,
        });

        this.setState(state => {
                return {
                    volume: Math.round(state.dim_x * state.dim_y * state.dim_z * 0.52 * 100) / 100
                }
            }
        )
    }

    handleToggleModal() {
        this.setState({
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
                    images: [],
                }
            }
        })
    }

    //todo change state name to editing
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
        lesions_list.splice(idx, 1)
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

    render() {
        let handlers = {
            onHistoryChange: this.onHistoryChange,
            onBiopsyChange: this.onBiopsyChange,
            onDimChange: this.onDimChange,
            handleLesionEdited: this.handleLesionEdited,
            handleEditLesion: this.handleEditLesion,
            handleDeleteLesion: this.handleDeleteLesion,
            handleToggleModal: this.handleToggleModal,
            handleAssessmentChange: this.handleAssessmentChange,
            handleSelectLocation: this.handleSelectLocation,
            volume: this.state.volume,
        };
        let lesions = this.state.lesions,
            editing = this.state.editing;

        return (
            <>
                <Navbar/>
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <MainContent
                                clinical={handlers}
                                lesions={lesions}
                                editing={editing}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

class MainContent
    extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let onHistoryChange = this.props.clinical.onHistoryChange,
            onBiopsyChange = this.props.clinical.onBiopsyChange,
            onDimChange = this.props.clinical.onDimChange,
            handleLesionEdited = this.props.clinical.handleLesionEdited,
            handleEditLesion = this.props.clinical.handleEditLesion,
            handleDeleteLesion = this.props.clinical.handleDeleteLesion,
            handleToggleModal = this.props.clinical.handleToggleModal,
            handleAssessmentChange = this.props.clinical.handleAssessmentChange,
            handleSelectLocation = this.props.clinical.handleSelectLocation,
            volume = this.props.clinical.volume;

        return (
            <>
                <ClinicalContent
                    onHistoryChange={onHistoryChange}
                    onBiopsyChange={onBiopsyChange}
                    onDimChange={onDimChange}
                    volume={volume}
                />
                <LesionList lesions={this.props.lesions}
                            handleEditLesion={handleEditLesion}
                            handleDeleteLesion={handleDeleteLesion}
                />
                <NewLesion editing={this.props.editing}
                           handleLesionEdited={handleLesionEdited}
                           handleToggleModal={handleToggleModal}
                           handleEditLesion={handleEditLesion}
                           handleAssessmentChange={handleAssessmentChange}
                           handleSelectLocation={handleSelectLocation}
                />
                <Button color="danger">Reset</Button>
            </>
        )
    }
}

export default App;

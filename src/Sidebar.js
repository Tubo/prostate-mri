import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';


class Sidebar extends Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem>Clinical History</ListGroupItem>
                <ListGroupItem>Biopsy Summary</ListGroupItem>
                <ListGroupItem>Prostate size</ListGroupItem>
                <ListGroupItem>Peripheral Zone lesions</ListGroupItem>
                <ListGroupItem>Transition Zone lesions</ListGroupItem>
            </ListGroup>
        )
    }
}

export default Sidebar;

import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import moment from 'moment';
import Task from '../Entities/Task';
class ModalBody extends React.Component {

    constructor(props) {
        super(props);

        this.state = { task: props.task, edit: props.edit, show: false };
    }

    handleShow = () => this.setState({ show: true });
    handleClose = () => this.setState({ show: false });
    insertNewTask = () => { 
        let t = new Task(6, "new task", true, false, moment("2020-04-18T08:00:00"), "Gastronomia", true);
        this.props.insertNewTask(t);
        this.handleClose();
    };
    updateTask = () => { 
        let t = new Task();
        this.props.updateTask(t);
        this.handleClose(); 
    };

    updateField = (name, value) => {
        this.setState((state) => {
          //  return { task.{ name }: value };
        });
    }
    render() {
        return (
            <>
                <Button variant="info" size="lg" className="fixed-right-bottom" onClick={this.handleShow}>
                    +
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit? "Edit Task": "Create new task"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="description" placeholder="Enter description" />
                            </Form.Group>
                            <Form.Check
                                onChange={(ev) => this.props.updateField(ev.target.name, ev.target.value)}></Form.Check>
                                type='checkbox'
                                label='important'
                                id={`important-checkbox`}
                            />
                            <Form.Check
                                type='checkbox'
                                label='private'
                                id='private-checkbox'
                            />
                            <Form.Group controlId="project">
                                <Form.Label>Project</Form.Label>
                                <Form.Control type="project" placeholder="Enter porject" />
                            </Form.Group>

                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.state.edit ?this.updateTask : this.insertNewTask}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


export default ModalBody;


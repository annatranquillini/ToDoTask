import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import moment from 'moment';
import Task from '../Entities/Task';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ModalBody extends React.Component {

    constructor(props) {
        super(props);
            this.state = { ...props.task, edit: props.edit, show: false };
       
    }

    handleShow = () => this.setState({ show: true });
    handleClose = () => this.setState({ show: false });
    insertNewTask = () => { 
        let t = new Task(null, this.state.description, this.state.important, this.state.privateTask, this.state.deadline, this.state.project, this.state.completed);
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
            return{[name]: value};
        });
        console.log(this.state);
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
                                <Form.Control type="description" placeholder="Enter description"
                                    name='description'
                                    onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
                            </Form.Group>
                            <Form.Check
                                type="switch"
                                onChange={(ev) => this.updateField(ev.target.name, ev.target.checked)}
                                label='important'
                                id={`important-checkbox`}
                                name='important'
                            />
                            <Form.Check
                                type="switch"
                                onChange={(ev) => this.updateField(ev.target.name, ev.target.checked)}
                                label='private'
                                id='private-checkbox'
                                name='privateTask'
                            />
                            <Form.Group controlId="project">
                                <Form.Label>Project</Form.Label>
                                <Form.Control type="project" placeholder="Enter project name"
                                    name='project'
                                    onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
                                
                            </Form.Group>
                            <DatePicker
                                label="task deadline"
                                selected={this.state.deadline}
                                onChange={(ev) => this.updateField("deadline", ev)}
                                name='deadline'
                            />
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


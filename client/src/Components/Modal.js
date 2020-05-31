import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Task from '../Entities/Task';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class ModalBody extends React.Component {

    constructor(props) {
        super(props);
        if (props.task == null && props.edit == false) {
            let task = new Task("", "", false, false, null, "", false);
            this.state = { ...task, edit: props.edit};
        }
        else
            this.state = { ...props.task, edit: props.edit };
    }

    insertNewTask = () => {
        let t = new Task(null, this.state.description, this.state.important, this.state.privateTask, this.state.deadline, this.state.project, this.state.completed);
        this.props.insertNewTask(t);
        this.props.hideModal();
    };
    updateTask = () => {
        let t = new Task(this.state.id, this.state.description, this.state.important, this.state.privateTask, this.state.deadline, this.state.project, this.state.completed);
        this.props.updateTask(t);
        this.props.hideModal();
    };

    updateField = (name, value) => {
        this.setState((state) => {
            return { [name]: value };
        });
        console.log(this.state);
    }

    render() {
        console.log(this.state.deadline);
        return (
            <Modal show={true} onHide={this.props.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.edit ? "Edit Task" : "Create new task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="description" placeholder="Enter description"
                                name='description'
                                onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}
                                value={this.state.description}/>
                        </Form.Group>
                        <Form.Check
                            type="switch"
                            onChange={(ev) => this.updateField(ev.target.name, ev.target.checked)}
                            label='important'
                            id={`important-checkbox`}
                            name='important'
                            checked={this.state.important}
                        />
                        <Form.Check
                            type="switch"
                            onChange={(ev) => this.updateField(ev.target.name, ev.target.checked)}
                            label='private'
                            id='private-checkbox'
                            name='privateTask'
                            checked={this.state.privateTask}
                        />
                        <Form.Group controlId="project">
                            <Form.Label>Project</Form.Label>
                            <Form.Control type="project" placeholder="Enter project name"
                                name='project'
                                onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}
                                value={this.state.project}/>

                        </Form.Group>
                        <DatePicker
                            label="task deadline"
                            onChange={(ev) => this.updateField("deadline", ev)}
                            name='deadline'
                            selected={this.state.deadline}
                        />
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.hideModal}>
                        Close
                        </Button>
                    <Button variant="primary" onClick={this.state.edit ? this.updateTask : this.insertNewTask}>
                        Save Changes
                        </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}


export default ModalBody;


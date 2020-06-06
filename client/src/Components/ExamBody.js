import React from 'react';
import { Badge, Button, Form, Row,  } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

function ExamBody(props) {
    return <main className="col-sm-8 col-12 below-nav">
        <h1 id="filter-title">All</h1>
        <ul className="list-group list-group-flush" id="taskList">
            {
                props.tasks.map(t =>
                    < ExamTile task={t} key={t.id} deleteTask={props.deleteTask} editTask={props.editTask} />)
            }
        </ul>
        <div id='errorMsg'>
        </div>
        {props.children}

    </main>
}

function ExamTile(props) {
    return <li className="list-group-item">
        <div className="d-flex w-100 justify-content-between">
            <Row className="p-2 flex-grow-1 bd-highlight">
                <Form.Check
                    type='checkbox'
                    label={props.task.description}
                    checked={props.task.completed}
                    onClick={()=> props.task.completed=!props.task.completed}
                />
            </Row>
            <Row className="p-2 flex-grow-1 bd-highlight">
                {props.task.project && <Badge
                    className="p-2 bd-highlight  m-1"
                    variant='info'
                    pill> {props.task.project}</Badge>}
                <div className="p-2 bd-highlight deadline"> {props.task.deadline.format("dddd, MMMM Do YYYY")}</div>
            </Row>
            <Link to="/add">
                <Button
                    className="m-1"
                    variant="warning"
                    size="sm"
                    onClick={() => props.editTask(props.task)}>
                    Edit
                </Button>
            </Link>
            <Button
                className="m-1"
                variant="danger"
                size="sm"
                onClick={() => props.deleteTask(props.task)}>
                Delete
                </Button>

        </div>
    </li>
}

export default ExamBody;

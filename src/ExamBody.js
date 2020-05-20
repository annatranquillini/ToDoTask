import React from 'react';
import moment from 'moment';

function ExamBody(props) {
    return <main className="col-sm-8 col-12 below-nav">
        <h1 id="filter-title">All</h1>
        <ul className="list-group list-group-flush" id="taskList">
            {
                props.tasks.map(t =>
                    < ExamTile task={t} key={t.id} />)
            }
        </ul>
        <div id='errorMsg'>
        </div>
        <button type="button" id="addButton" className="btn btn-lg btn-info fixed-right-bottom" data-toggle="modal" data-target="#modal">&#43;</button>

    </main>
}

function ExamTile(props) {
    console.log(props.task.description.completed)
    return <li className="list-group-item task">
        <div className="d-flex w-100 justify-content-between">
            <div className="p-2 flex-grow-1 bd-highlight">
                <input type="checkbox" aria-label="Checkbox for following text input" checked={props.task.completed} />
                <span>  {props.task.description} </span>
            </div>
            <div className="p-3 bd-highlight badge badge-info badge-pill  ml-4"> {props.task.project} </div>
            <div className="p-2 bd-highlight deadline"> {props.task.deadline.format("dddd, MMMM Do YYYY")}</div>
        </div>
    </li>
}

export default ExamBody;

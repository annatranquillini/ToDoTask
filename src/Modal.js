import React from 'react';

function ModalBody(props) {
    console.log(props.visible);
    if (props.visible===true) {
        return <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add new task</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" >
                            <div className="form-group">
                                <label htmlFor="Description">Description</label>
                                <input type="text" className="form-control" id="descriptionForm" aria-describedby="text"
                                    placeholder="Enter the task description" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Description">Deadline</label>
                                <input type="date" className="form-control" id="deadlineForm" aria-describedby="text"
                                    placeholder="Enter the task deadline" required />
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Private
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="defaultCheck2" />
                                <label className="form-check-label" htmlFor="defaultCheck2">
                                    Important
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button className="btn btn-primary addTaskButton " type="submit" data-dismiss="modal">Submit form</button>
                    </div>
                </div>
            </div>
        </div>;
    }
    else
        return <div></div>

}

export default ModalBody;

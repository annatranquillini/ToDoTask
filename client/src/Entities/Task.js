import moment from 'moment'

class Task {

    constructor(id, description, important, privateTask, deadline, project, completed) {
        if (id)
            this.id = id;

        this.description = description;
        if (important == null)
            this.important = false;
        else
            this.important = important;
        
        if (privateTask == null)
            this.privateTask = false;
        else
            this.privateTask = privateTask;

        if (completed == null)
            this.completed = false;
        else
            this.completed = completed;
        
        if (deadline==null)
            this.deadline = moment();
        else    
            this.deadline = moment(deadline);
        
        if (project == null)
            this.project = "";
        else
            this.project = project;
    }

    /**
     * Construct a Task from a plain object
     * @param {{}} json 
     * @return {Task} the newly created Task object
     */
    static from(json) {
        const t = Object.assign(new Task(), json);
        if (t.deadline)
            t.deadline = moment(t.deadline);
        return t;
    }

}

export default Task;


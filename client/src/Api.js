import Task from './Entities/Task.js';
import moment from 'moment';
import Class from './Entities/Class.js';

//GET

async function getTasks(filter) {
    let url = "/api/tasks";
    if (filter) {
        const queryParams = "?filter=" + filter;
        url += queryParams;
    }
    console.log(url);
    const response = await fetch(url);
    const tasksJson = await response.json();
    if (response.ok) {
        return tasksJson.map((t) => Task.from(t));
    } else {
        throw "Error";  // An object with the error coming from the server
    }
}

async function getProjects() {
    let projects = await getTasks();
    return projects.map(t => new Class(t.project, false, t.project)).filter((value, index, self) => self.map(v => v.name).indexOf(value.name) === index);
}

// value -> il valore dell'elemento
// index -> l'indice dell'elemento
// self -> l' Array oggetto da passare


//POST
async function insertNewTask(task) {
    return new Promise((resolve, reject) => {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

//PUT
async function updateTask(task) {
    return new Promise((resolve, reject) => {
        fetch('/api/tasks/' + task.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
 }

//DELETE
async function deleteTask(taskIId) { 
    return new Promise((resolve, reject) => {
        fetch('/api/tasks/' + taskIId, {
            method: 'DELETE'
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}



const Api = { getTasks, getProjects, getTasks, insertNewTask, deleteTask, updateTask };

export default Api;

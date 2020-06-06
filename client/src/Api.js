import Task from './Entities/Task.js';
import moment from 'moment';
import Class from './Entities/Class.js';

const fakeTasks = [
    new Task(1, "Eat sushi", true, false, moment("2020-05-22T08:00:00"), "Gastronomia", false),
    new Task(2, "Dance", false, true, moment("2020-04-18T08:00:00"), "Cucina", false),
    new Task(3, "Study swedisch", true, false, moment("2020-04-18T08:00:00"), "Fantasia", false),
    new Task(4, "Coding", true, false, moment("2020-04-18T08:00:00"), "Gastronomia", true),
];

const fakeProjects = fakeTasks.map(t => new Class(t.project, false, t.project)).filter((value, index, self) => self.map(v => v.name).indexOf(value.name) === index);

// value -> il valore dell'elemento
// index -> l'indice dell'elemento
// self -> l' Array oggetto da passare



/**
* Function to check if a date is today. Returns true if the date is today, false otherwise.
* @param {*} date a Moment js date to be checked
*/
const isToday = function (date) {
    return date.isSame(moment(), 'day');
}

/**
* Function to check if a date is in the next week. Returns true if the date is in the next week, false otherwise.
* @param {*} date a Moment js Date to be checked
*/
const isNextWeek = function (date) {
    const nextWeek = moment().add(1, 'weeks');
    const tomorrow = moment().add(1, 'days');
    return date.isAfter(tomorrow) && date.isBefore(nextWeek);
}
//GET

async function getTasks(filter) {
    let url = "/api/tasks";
    if (filter && filter!="all") {
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

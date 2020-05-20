import Task from './Task.js';
import moment from 'moment';
import Class from './Class.js';

const fakeTasks = [
    new Task(1, "Eat sushi", true, false, moment("2020-04-18T08:00:00"), "Gastronomia", false),
    new Task(2, "Dance", true, false, moment("2020-04-18T08:00:00"), "Cucina", false),
    new Task(3, "Study swedisch", true, false, moment("2020-04-18T08:00:00"), "Fantasia", false),
    new Task(4, "Coding", true, false, moment("2020-04-18T08:00:00"), "Gastronomia", true),
];

const fakeProjects = [...new Set(fakeTasks.map(t => new Class(t.project, false, null)))];

 
 async function getTasks() {
    return fakeTasks;
}

async  function getProjects() {
    return fakeProjects;
}

const Api = { getTasks, getProjects };

export default Api;

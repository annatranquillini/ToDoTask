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


async function getTasks() {
    return fakeTasks;
}

async function getProjects() {
    return fakeProjects;
}

async function getFilteredTasks(filter) {
    var tasks = [];
    switch (filter) {
        case "all":
            tasks = fakeTasks;
            break;
        case "important":
            tasks = fakeTasks.filter((el) => {
                return el.important;
            });
            break;
        case "private":
            tasks = fakeTasks.filter((el) => {
                return el.privateTask;
            });
            break;
        case "shared":
            tasks = fakeTasks.filter((el) => {
                return !el.privateTask;
            });
            break;
        case "today":
            tasks = fakeTasks.filter((el) => {
                if (el.deadline)
                    return isToday(el.deadline);
                else
                    return false;
            });
            break;
        case "week":
            tasks = fakeTasks.filter((el) => {
                if (el.deadline)
                    return isNextWeek(el.deadline);
                else
                    return false;
            });
            break;
        default:
            //try to filter by project
            tasks = fakeTasks.filter((el) => {
                return el.project === filter;
            });
    }
    return tasks;
}

async function insertNewTask() { }

async function deleteTask() { }

async function updateTask() { }

const Api = { getTasks, getProjects, getFilteredTasks, insertNewTask, deleteTask, updateTask };

export default Api;

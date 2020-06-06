import React from 'react';

import './res/App.css';
import Api from './Api.js';
import Class from './Entities/Class.js'

import Toolbar from './Components/Toolbar.js';
import SideBar from './Components/Sidebar.js';
import ExamBody from './Components/ExamBody.js';
import ModalBody from './Components/Modal';
import { Button, Row, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const classes = [
  new Class("All", true, null),
  new Class("Important", false, "important"),
  new Class("Today", false, "today"),
  new Class("Next 7 Days", false, "week"),
  new Class("Private", false, "private"),
  new Class("Shared With...", false, "shared"),
];



class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { tasks: [], projects: [], classes: classes, edit: false, task: null, show: false };
  }
  componentDidMount() {
    Api.getTasks().then((ex) => this.setState({ tasks: ex }));
    Api.getProjects().then((cs) => this.setState({ projects: cs }));
  }

  activateClass = (cl) => {
    this.setState((state) => {
      let newClasses = state.classes.map(c => { if (c.name !== cl.name) { return new Class(c.name, false, c.filter) } else { return new Class(c.name, true, c.filter) } });
      let newProjects = state.projects.map(c => { if (c.name !== cl.name) { return new Class(c.name, false, c.filter) } else { return new Class(c.name, true, c.filter) } });
      return { classes: newClasses, projects: newProjects };
    });
  };

  getFilteredTasks = async (filter) => {
    let newTasks = await Api.getTasks(filter);
    this.setState({ tasks: newTasks });
    // this.activateClass(filter);
  }

  insertNewTask = async (t) => {
    await Api.insertNewTask(t);
    this.setState((state) => {
      let newProjects = state.tasks.concat(t).map(t => new Class(t.project, false, t.project)).filter((value, index, self) => self.map(v => v.name).indexOf(value.name) === index);
      return { tasks: state.tasks.concat(t), projects: newProjects }
    })
  };

  updateTask = async (task) => {
    await Api.updateTask(task);
    this.setState((state) => {
      let newTasks = state.tasks.map(t => {
        if (t.id === task.id)
          return task;
        else
          return t;
      })
      let newProjects = newTasks.map(t => new Class(t.project, false, t.project)).filter((value, index, self) => self.map(v => v.name).indexOf(value.name) === index);

      return { tasks: newTasks, projects: newProjects }
    })
  };

  openEditModal = (task) => {
    this.setState(
      { task: task })
  }

  deleteTask = async (task) => {
    await Api.deleteTask(task.id);
    this.setState((state) => {
      let newTasks = state.tasks.filter(t => t.id !== task.id);
      let newProjects = newTasks.map(t => new Class(t.project, false, t.project)).filter((value, index, self) => self.map(v => v.name).indexOf(value.name) === index);

      return { tasks: newTasks, projects: newProjects }
    })
  };

  toggleTask = async (t) => {
    t.completed = !t.completed;
    await Api.updateTask(t);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login">
          </Route>
          <Route path="/">
            <Toolbar />
            <Container className="container-fluid">
              <Row >
                <SideBar projects={this.state.projects} classes={this.state.classes} goToThisFilter={this.getFilteredTasks} />
                <ExamBody tasks={this.state.tasks} deleteTask={this.deleteTask} editTask={this.openEditModal} toggleTask={this.toggleTask}>
                  <Link to={'/add'}>
                    <Button variant="info" size="lg" className="fixed-right-bottom">
                      +
                   </Button>
                  </Link>
                  <Route exact path="/add">
                    <ModalBody task={this.state.task} edit={false} insertNewTask={this.insertNewTask} />
                  </Route>
                  <Route exact path="/edit">
                    <ModalBody task={this.state.task} edit={true} updateTask={this.updateTask} />
                  </Route>
                </ExamBody>
              </Row>
            </Container>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

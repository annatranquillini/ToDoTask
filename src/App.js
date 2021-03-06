import React from 'react';

import './res/App.css';
import Api from './Api.js';
import Class from './Entities/Class.js'

import Toolbar from './Components/Toolbar.js'
import SideBar from './Components/Sidebar.js'
import ExamBody from './Components/ExamBody.js'
import ModalBody from './Components/Modal';
import { Button} from 'react-bootstrap';

const classes = [
  new Class("All", true, "all"),
  new Class("Important", false, "important"),
  new Class("Today", false, "today"),
  new Class("Next 7 Days", false, "week"),
  new Class("Private", false, "private"),
  new Class("Shared With...", false, "shared"),
];


class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = { tasks: [], projects: [], classes: classes,edit: false, task: null, show:false};
  }
  componentDidMount() {
    Api.getTasks().then((ex) => this.setState({ tasks: ex }));
    Api.getProjects().then((cs) => this.setState({ projects: cs }));
  }

  activateClass = (cl) => {
    this.setState((state) => {
      let newClasses = state.classes.map(c => { if (c.name !== cl.name) { return new Class(c.name, false, c.filter) } else { return new Class(c.name, true, c.filter)} });
      let newProjects = state.projects.map(c => { if (c.name !== cl.name) { return new Class(c.name, false, c.filter) } else { return new Class(c.name, true, c.filter) }  });
      return { classes: newClasses, projects: newProjects };
    });
  };

   getFilteredTasks = async (c) => {
    let newTasks= await Api.getFilteredTasks(c.filter);
    this.setState({ tasks: newTasks });
    this.activateClass(c);
   }
  
  insertNewTask = (t) => {
    this.setState((state)=>{
      return {tasks: state.tasks.concat( t)}
    }) 
  };

  updateTask = (task) => {
    this.setState((state) => {
     let newTasks = state.tasks.map(t => {
        if (t.id === task.id)
          return task;
        else
          return t;
      })
      return { tasks: newTasks }
    })
  };

  openEditModal = (task) => {
    this.setState((state) => {
      return {edit: true, task:task,show:true}
    })
  }

  deleteTask = (task) => {
    this.setState((state) => {
      let newTasks = state.tasks.filter(t => t.id !== task.id);
      return { tasks: newTasks }
    })
  };

  openNewTaskModal = () => {
    this.setState({ show: true , edit:false, task:null});
  }
  

  hideModal = () => {
    this.setState({ show: false });
  }


  render() {
    return (
      <div className="App">
        <Toolbar />
        <div className="container-fluid">
          <div className="row vheight-100">
            <SideBar projects={this.state.projects} classes={this.state.classes} goToThisFilter={this.getFilteredTasks}/>
            <ExamBody tasks={this.state.tasks} deleteTask={this.deleteTask} editTask={this.openEditModal}>
              <Button variant="info" size="lg" className="fixed-right-bottom" onClick={this.openNewTaskModal}>
                +
                 </Button>
              {this.state.show && <ModalBody task={this.state.task} edit={this.state.edit} insertNewTask={this.insertNewTask} updateTask={this.updateTask} hideModal={this.hideModal}/>}
            </ExamBody> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;

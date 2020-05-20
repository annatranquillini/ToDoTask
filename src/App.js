import React from 'react';

import './App.css';
import Api from './Api.js';
import Class from './Class.js'

import Toolbar from './Toolbar.js'
import SideBar from './Sidebar.js'
import ExamBody from './ExamBody.js'
import ModalBody from './Modal';



const classes = [
  new Class("All", true, null),
  new Class("Important", false, null),
  new Class("Today", false, null),
  new Class("Next 7 Days", false, null),
  new Class("Private", false, null),
  new Class("Shared With...", false, null),
];


class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = { tasks: [], projects: [], classes: classes,visible: false};
  }
  componentDidMount() {
    Api.getTasks().then((ex) => this.setState({ tasks: ex }));
    Api.getProjects().then((cs) => this.setState({ projects: cs }));
  }

  activateClass = (cl) => {
    this.setState((state) => {
      let newClasses = state.classes.map(c => { if (c.name !== cl.name) {return new Class(c.name, false, null) } else {return new Class(c.name, true, null)} });
      let newProjects = state.projects.map(c => { if (c.name !== cl.name) { return new Class(c.name, false, null) } else {return  new Class(c.name, true, null) }  });
      //console.log(newClasses);
      //console.log(newProjects);
      return { classes: newClasses, projects: newProjects };
    });
  };

  goToThisFilter = (c) => {
    this.activateClass(c);
  }

  render() {
    return (
      <div className="App">
        <Toolbar />
        <div className="container-fluid">
          <div className="row vheight-100">
            <SideBar projects={this.state.projects} classes={this.state.classes} goToThisFilter={this.activateClass}/>
            <ExamBody tasks={this.state.tasks} />
            <ModalBody visible={this.state.visible} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

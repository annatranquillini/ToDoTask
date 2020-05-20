import React from 'react';


class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { projects: this.props.projects, classes: this.props.classes };
    }
    render() {
        return <aside className="collapse d-sm-block col-sm-4 col-12 bg-light below-nav" id="left-sidebar">
            <div className="list-group list-group-flush">
                {this.state.classes.map((c, index) => <ListTile key={index} name={c.name} cl={c} active={c.active} goToThisFilter={this.props.goToThisFilter} />)}
            </div>
            <div className="my-5">
                <h6 className="border-bottom border-gray p-3 mb-0">Projects</h6>
                <div className="list-group list-group-flush" id="projects">
                    {this.state.projects.map((p, index) => <ListTile key={index} name={p.name} cl={p} active={p.active} goToThisFilter={this.props.goToThisFilter} />)}
                </div>
            </div>
        </aside>
    }
}

function ListTile(props) {
    var myClassName;
    if (props.active)
        myClassName = "list-group-item list-group-item-action active";
    else
        myClassName = "list-group-item list-group-item-action";
    return <a data-id="filter-all" className={myClassName} onClick= {() => props.goToThisFilter(props.cl)}>{props.name}</a>
}

export default SideBar;

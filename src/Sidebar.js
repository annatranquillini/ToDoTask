import React from 'react';


function SideBar (props) {
    
        return <aside className="collapse d-sm-block col-sm-4 col-12 bg-light below-nav" id="left-sidebar">
            <div className="list-group list-group-flush">
                {props.classes.map((c, index) => <ListTile key={index} name={c.name} cl={c} active={c.active} goToThisFilter={props.goToThisFilter} />)}
            </div>
            <div className="my-5">
                <h6 className="border-bottom border-gray p-3 mb-0">Projects</h6>
                <div className="list-group list-group-flush" id="projects">
                    {props.projects.map((p, index) => <ListTile key={index} name={p.name} cl={p} active={p.active} goToThisFilter={props.goToThisFilter} />)}
                </div>
            </div>
        </aside>
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

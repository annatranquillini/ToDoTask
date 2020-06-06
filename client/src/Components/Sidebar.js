import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBar(props) {

    return <aside className="collapse d-sm-block col-sm-4 col-12 bg-light below-nav" id="left-sidebar">
        <div className="list-group list-group-flush">
            {props.classes.map((c, index) => <ListTile key={index} name={c.name} filter={c.filter} active={c.active} goToThisFilter={props.goToThisFilter} />)}
        </div>
        <div className="my-5">
            <h6 className="border-bottom border-gray p-3 mb-0">Projects</h6>
            <div className="list-group list-group-flush" id="projects">
                {props.projects.map((p, index) => <ListTile key={index} name={p.name} filter={p.name} active={p.active} goToThisFilter={props.goToThisFilter} />)}
            </div>
        </div>
    </aside>
}

function ListTile(props) {

    return <NavLink
        to={`/${props.filter}`}
        activeClassName='active'
        className="list-group-item list-group-item-action"
        onClick={() => props.goToThisFilter(props.filter)}>{props.name}
    </NavLink>
}

export default SideBar;

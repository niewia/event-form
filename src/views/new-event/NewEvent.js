import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import CreateNewEvent from './create/CreateNewEvent';
import Success from './success/Success';
import './NewEvent.less';

class NewEvent extends Component {

    render() {
        return (
            <div>
                <div className='header'>
                    <div>
                        <NavLink activeClassName='is-active' className='nav-link' to={`${this.props.match.url}`}>
                            New Event
                        </NavLink>
                    </div>
                </div>
                <Route exact path={`${this.props.match.path}/`} component={CreateNewEvent} />
                <Route exact path={`${this.props.match.path}/success`} component={Success} />
            </div>
        )
    }
}

export default NewEvent; 
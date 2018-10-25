import React, { Component } from 'react';
import NewEvent from './views/new-event/NewEvent';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.less';
import './styles/global.less';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Route path='/new-event' component={NewEvent} />
          <Route exact path="/" render={() => <Redirect to="/new-event" />}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

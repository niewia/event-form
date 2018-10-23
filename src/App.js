import React, { Component } from 'react';
import NewEvent from './views/new-event/NewEvent';
import './App.less';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewEvent></NewEvent>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Timer from './components/Timer/timer';
import List from './components/List/list';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="">
        <div className="">
          <h2 className="app-title">Wakati Timer</h2>
          <div className="flex-row-center">
            <Timer />
            <List />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

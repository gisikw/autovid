import React, { Component } from 'react';
import DashboardPage from './components/pages/DashboardPage';
import SeriesPage from './components/pages/SeriesPage';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { page: 'dashboard' };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <a
              onClick={() => this.setState({page: 'dashboard'})}
              style={{cursor: 'pointer'}}
            >AutoVid Dashboard</a>
            {' '} | {' '}
            <a
              onClick={() => this.setState({page: 'series'})}
              style={{cursor: 'pointer'}}
            >Series</a>
          </h2>
        </div>
        { this.state.page === 'dashboard' ? <DashboardPage /> : <SeriesPage /> }
      </div>
    );
  }
}

export default App;

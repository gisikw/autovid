import React, { Component } from 'react';
import CalendarDay from './CalendarDay';
import Video from './Video';
import './App.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let data = [];

function xhr({ method, url }) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onerror = () => reject(Error('Network Error'));
    req.onload = () => {
      if (req.status >= 200 && req.status < 300) resolve(req.responseText);
      else reject(Error(req.statusText));
    };
    req.open(method, url, true);
    req.send();
  });
}
xhr.get = (url, opts = {}) => xhr(Object.assign({ method: 'GET', url }, opts));

function getDayOfTheWeek() {
  let today = new Date();
  return DAYS[today.getDay()];
}

function getStartingDay() {
  let date = new Date();
  date.setHours(0,0,0,0);
  if (date.getDay() === 1) return date;
  if (date.getDay() === 0) {
    date.setDate(date.getDate() - 6);
    return date;
  }
  date.setDate(date.getDate() - (date.getDay() - 1));
  return date;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    xhr.get('http://localhost:4000').then((data) => {
      this.setState({ data: JSON.parse(data) });
    });
    setInterval(() => {
      xhr.get('http://localhost:4000').then((data) => {
        this.setState({ data: JSON.parse(data) });
      });
    }, 5000);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <a>AutoVid Dashboard</a>
            {' '} | {' '}
            <a>Series</a>
          </h2>
        </div>
        {
          Array(28).fill(0).map((_, offset) => {
            let start = getStartingDay();
            start.setDate(start.getDate() - 7); // tmp
            start.setDate(start.getDate() + offset);

            let children = [];
            this.state.data.forEach((videoData) => {
              let vidPubMills = videoData.publishTime * 1000;
              if (vidPubMills >= start.getTime() && vidPubMills < (start.getTime() + (24 * 60 * 60 * 1000))) {
                children.push(<Video {...videoData} />);
              }
            });

            return <CalendarDay start={start} children={children} />
          })
        }
      </div>
    );
  }
}

export default App;

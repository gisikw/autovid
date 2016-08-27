import React, { Component } from 'react';
import CalendarDay from './CalendarDay';
import Video from './Video';
import './App.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let data = [
  { name: 'Hell Divers', channel: 'CheersKevinReads',     publishTime: 1472354789, status: 'Scheduled' },
  { name: 'Minecraft', channel: 'CheersKevinGames',       publishTime: 1472527589, status: 'Scheduled' },
  { name: 'Podcast', channel: 'CodeMonkeyPodcast',        publishTime: 1472462789, status: 'Uploading' },
  { name: 'Podcast', channel: 'CodeMonkeyPodcast',        publishTime: 1472462789, status: 'Public' },
  { name: 'Space Engineers', channel: 'CheersKevinGames', publishTime: 1472009189, status: 'Public' },
];

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
  render() {

    let secondDay = getStartingDay();
    secondDay.setDate(secondDay.getDate() + 1);

    let thirdDay = getStartingDay();
    thirdDay.setDate(thirdDay.getDate() + 2);

    return (
      <div className="App">
        <div className="App-header">
          <h2>Test Dashboard</h2>
        </div>
        {
          [0,1,2,3,4,5,6,7,8,9,10,11,12,13].map((offset) => {
            let start = getStartingDay();
            start.setDate(start.getDate() + offset);

            let children = [];
            data.forEach((videoData) => {
              let vidPubMills = videoData.publishTime * 1000;
              console.debug(vidPubMills);
              console.debug(start.getTime());

              if (vidPubMills > start.getTime() && vidPubMills < (start.getTime() + (24 * 60 * 60 * 1000))) {
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

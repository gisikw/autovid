import React, { Component } from 'react';
import CalendarDay from '../elements/CalendarDay';
import Video from '../elements/Video';
import xhr from '../../utils/xhr';

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

let poller;

class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    xhr.get('http://localhost:4000').then((data) => {
      this.setState({ data: JSON.parse(data) });
    });
    poller = setInterval(() => {
      xhr.get('http://localhost:4000').then((data) => {
        this.setState({ data: JSON.parse(data) });
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(poller);
  }

  render() {
    return (
      <div>
        {
          Array(56).fill(0).map((_, offset) => {
            let start = getStartingDay();
            start.setDate(start.getDate() - 7); // tmp
            start.setDate(start.getDate() + offset);

            let children = [];
            this.state.data.forEach((videoData) => {
              let vidPubMills = videoData.publishTime * 1000;
              if (vidPubMills >= start.getTime() && vidPubMills < (start.getTime() + (24 * 60 * 60 * 1000))) {
                children.push(<Video key={videoData.id} {...videoData} />);
              }
            });
            let sortedChildren = (children || []).sort((a,b) => a.props.publishTime - b.props.publishTime)

            return <CalendarDay key={start} start={start} children={sortedChildren} />
          })
        }
      </div>
    );
  }
}

export default DashboardPage;

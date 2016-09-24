import React, { Component } from 'react';
import xhr from '../../utils/xhr';

function Series(params) {
  let time = (new Date(params.publish_at*1000)).toTimeString();
  let chunks = time.split(':');
  let hours = parseInt(chunks[0]);
  let ampm = (hours < 12) ? 'AM' : 'PM';
  hours = hours % 12;
  let minutes = chunks[1];

  time = time.split(':').slice(0,2).join(':');

  let release = "00" + params.release_number;
  release = release.slice(release.length - 3, release.length);

  return (
    <div className={`Series Series-${params.channel}`}>
      <div>{params.title}</div>
      <div>Latest: {params.prefix}{release} on {time} {ampm}</div>
      <div>Tags: {params.tags}</div>
      <div>Description: {params.description}</div>
    </div>
  );
}

let poller;

class SeriesPage extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    xhr.get('http://localhost:4000/series').then((data) => {
      this.setState({ data: JSON.parse(data) });
    });
    poller = setInterval(() => {
      xhr.get('http://localhost:4000/series').then((data) => {
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
        { this.state.data.map((params) => <Series key={params.title} {...params } />) }
      </div>
    );
  }
}

export default SeriesPage;

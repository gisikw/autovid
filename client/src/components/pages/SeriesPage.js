import React, { Component } from 'react';
import api from '../../utils/api';
import Series from '../elements/Series';

let poller;

class SeriesPage extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    api.series.all().then((data) => this.setState({ data: data.data }));
    poller = setInterval(() => {
      api.series.all().then((data) => this.setState({ data: data.data }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(poller);
  }

  render() {
    return (
      <div>
        {
          this.state.data.map((params) =>
            <Series key={params.id} {...params } />)
        }
        <button
          onClick={() => api.series.create({series: {title: 'New Series'}})}
        >
          Add Series
        </button>
      </div>
    );
  }
}

export default SeriesPage;

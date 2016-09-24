import React, { Component } from 'react';
import xhr from '../../utils/xhr';
import Series from '../elements/Series';

const SERIES_URL = 'http://10.0.0.12/series';
let poller;

class SeriesPage extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    xhr.get(SERIES_URL).then((data) => {
      this.setState({ data: JSON.parse(data) });
    });
    poller = setInterval(() => {
      xhr.get(SERIES_URL).then((data) => {
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
          this.state.data.map((params) =>
            <Series key={params.title} {...params } />)
        }
      </div>
    );
  }
}

export default SeriesPage;

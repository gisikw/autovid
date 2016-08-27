import React, { Component } from 'react';
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class CalendarDay extends Component {
  render() {
    //let sortedChildren = (this.props.children || []).sort((a,b) => a.props.time - b.props.time);

    return (
      <div className='Calendar-day'>
        <div style={{background: '#ccc'}}>{ DAYS[this.props.start.getDay()] }</div>
        { this.props.children }
      </div>
    );
  }
}

export default CalendarDay;

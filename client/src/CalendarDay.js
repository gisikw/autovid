import React, { Component } from 'react';
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class CalendarDay extends Component {
  render() {
    let sortedChildren = (this.props.children || []).sort((a,b) => a.props.publishTime - b.props.publishTime);

    return (
      <div className='Calendar-day'>
        <div style={{background: '#ccc'}}>{ DAYS[this.props.start.getDay()] }</div>
        { sortedChildren }
      </div>
    );
  }
}

export default CalendarDay;

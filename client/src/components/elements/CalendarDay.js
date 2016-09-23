import React, { Component } from 'react';
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class CalendarDay extends Component {
  render() {
    let sortedChildren = (this.props.children || []).sort((a,b) => a.props.publishTime - b.props.publishTime);
    let classes = 'Calendar-day';
    if (this.props.start.getDate() === (new Date()).getDate()) classes = classes + ' today';

    return (
      <div className={classes}>
        <div className='Calendar-day-name'>{ DAYS[this.props.start.getDay()] }</div>
        { sortedChildren }
      </div>
    );
  }
}

export default CalendarDay;

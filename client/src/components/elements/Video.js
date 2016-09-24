import React, { Component } from 'react';

class Video extends Component {
  render() {
    let time = (new Date(this.props.publishTime*1000)).toTimeString();
    let chunks = time.split(':');
    let hours = parseInt(chunks[0]);
    let ampm = (hours < 12) ? 'AM' : 'PM';
    hours = hours % 12;
    let minutes = chunks[1];

    time = time.split(':').slice(0,2).join(':');
    return (
      <div className={`Video-component Video-${this.props.channel} Video-${this.props.status}`} style={{ background: `url('http://img.youtube.com/vi/${this.props.id}/hqdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
        <div className={`tint tint-${this.props.channel}`}>
          { `${this.props.title}` }
        </div>
        { `${this.props.title}` }
        <span className='Video-time'>{`${hours}:${minutes}${ampm}`}</span>
      </div>
    );
  }
}

export default Video;

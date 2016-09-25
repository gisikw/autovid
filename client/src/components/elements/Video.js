import React, { Component } from 'react';
import radium from 'radium';

const Video = ({ youtube_id, status, title, channel, publishTime }) => (
  <div style={ styles.container(youtube_id, status) }>
    <div style={ [styles.overlay, styles.tint[channel] ] }>{ title }</div>
    { title }
    <span style={ styles.time }>{timeString(publishTime)}</span>
  </div>
);

const timeString = (unix) => {
  let chunks = (new Date(unix*1000)).toTimeString().split(':');
  let hours = parseInt(chunks[0]);
  return `${hours % 12}:${chunks[1]} ${(hours < 12 ) ? 'A' : 'P' }M`;
};

const styles = {
  container: (id, status) => ({
    backgroundImage: (status === 'public') &&
                     `url('http://img.youtube.com/vi/${id}/hqdefault.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderBottom: '1px solid #222',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '4px 60px 4px 4px',
    position: 'relative',
    position: 'relative',
    textAlign: 'left',
  }),
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    bottom: 0,
    left: 0,
    padding: '4px 60px 4px 4px',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  time: {
    position: 'absolute',
    right: '4px',
    top: '4px',
  },
  tint: {
    CheersKevinGames: {
      backgroundImage: 'linear-gradient(to top, #982222, transparent)',
    },
    CheersKevinReads: {
      backgroundImage: 'linear-gradient(to top, #0083ff, transparent)',
    },
    CodeMonkeyPodcast: {
      backgroundImage: 'linear-gradient(to top, #129912, transparent)',
    },
    CheersKevin: {
      backgroundImage: 'linear-gradient(to top, #aa4488, transparent)',
    },
    CheersKevinVlogs: {
      backgroundImage: 'linear-gradient(to top, #cccc22, transparent)',
      color: '#000',
    },
    Placeholder: {
      backgroundImage: 'linear-gradient(to top, #efe, transparent)',
      color: '#666',
    },
  },
};

export default radium(Video);

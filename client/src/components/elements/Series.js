import React from 'react';
import radium from 'radium';

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
    <div style={styles.container }>
      <div style={styles.rightSection}>
        <p>Edit</p>
        <p>Delete</p>
      </div>
      <div>{params.title}</div>
      <div>Latest: {params.prefix}{release} on {time} {ampm}</div>
      <div>Tags: {params.tags}</div>
      <div>Description: {params.description}</div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    background: '#aaa',
    border: '1px solid #333',
    width: '90%',
    maxWidth: '960px',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: '15px auto',
    padding: '10px',
    boxSizing: 'border-box',
  },
  rightSection: {
    position: 'absolute',
    textAlign: 'right',
    right: '10px',
    top: 0,
  },
};

export default radium(Series);

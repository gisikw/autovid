import React, { Component } from 'react';
import radium from 'radium';
import api from '../../utils/api';

class Series extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
    };
    ['edit', 'save', 'cancel', 'destroy', 'updateField'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  edit() {
    this.setState(Object.assign({}, this.props, { editing: true }));
  }

  save() {
    api.series.update(this.props.id, this.state).then(() => {
      this.setState({ editing: false });
    });
  }

  cancel() {
    this.setState({ editing: false });
  }

  destroy() {
    api.series.destroy(this.props.id);
  }

  contents(data) {
    if (this.state.editing) return this.form(data);
    let release = "00" + data.release_number;
    release = release.slice(release.length - 3, release.length);
    return (
      <div>
        <div>{data.title}</div>
        <div>Latest: {data.prefix}{release} on {timeString(data.publish_at)}</div>
        <div>Tags: {data.tags}</div>
        <div>Description: {data.description}</div>
      </div>
    );
  }

  form(data) {
    let fields = ['title', 'prefix', 'channel', 'description', 'tags', 'publish_at', 'release_number'];
    return (
      <div>
        {
          fields.map((field) => (
            <div style={ styles.inputWrap } key={field}>
              <div>
                <input style={ styles.input } value={data[field]} onChange={this.updateField(field)}/>
                <div style={ styles.label }>{field.replace('_', ' ')}</div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  updateField(name) {
    return (e) => this.setState({ [name]: e.target.value });
  }

  rightSection() {
    let firstButton = <p onClick={ this.edit } style={ styles.button }>Edit</p>;
    let secButton = <p onClick={ this.destroy } style={ styles.button }>Delete</p>;
    if (this.state.editing) {
      firstButton = <p onClick={ this.save } style={ styles.button }>Save</p>;
      secButton = <p onClick={ this.cancel } style={ styles.button }>Cancel</p>;
    }
    return (
      <div style={ styles.rightSection }>
        { firstButton }
        { secButton }
      </div>
    );
  }

  render() {
    let data = this.state.editing ? this.state : this.props;
    return (
      <div style={ [styles.container, styles.bg[data.channel] ] }>
        { this.rightSection() }
        { this.contents(data) }
      </div>
    );
  }
}

const timeString = (unix) => {
  let chunks = (new Date(unix*1000)).toTimeString().split(':');
  let hours = parseInt(chunks[0]);
  return `${hours % 12}:${chunks[1]} ${(hours < 12 ) ? 'A' : 'P' }M`;
};

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
    zIndex: 1,
  },
  button: {
    cursor: 'pointer',
  },
  bg: {
    gisikwGames: {
      background: '#982222',
    },
    gisikwReads: {
      background: '#0083ff',
    },
    codemonkeypodcast: {
      background: '#129912',
    },
    gisikw: {
      background: '#aa4488',
    },
    gisikwVlogs: {
      background: '#cccc22',
      color: '#000',
    },
  },
  inputWrap: {
    position: 'relative',
  },
  input: {
    fontSize: '24px',
    lineHeight: '48px',
    padding: '0 10px 0 145px',
    width: '60%',
  },
  label: {
    position: 'absolute',
    top: '22px',
    left: '15px',
    color: '#999',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.7px',
  }
};

export default radium(Series);

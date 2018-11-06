import React, { Component } from 'react';

class Joke extends Component {
  render() {
    return (
      <div>
        <b>{this.props.votes}</b>
        {'  '}
        {this.props.joke}
        <button onClick={() => this.props.handleUpVote(this.props.id)}>
          Up +
        </button>
        <button onClick={() => this.props.handleDownVote(this.props.id)}>
          Down -
        </button>
      </div>
    );
  }
}

export default Joke;

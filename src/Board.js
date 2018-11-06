import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import uuid from 'uuid/v4';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [], loading: true };
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  async componentDidMount() {
    let jokes = [];
    for (let i = 0; i < 10; i++) {
      let resp = await axios.get(`https://icanhazdadjoke.com/`, {
        headers: { Accept: 'application/json' }
      });
      jokes.push(resp.data);
    }

    // console.log(resp.data); resp.data is jopke object
    jokes = jokes.map(joke => {
      joke.votes = 0;
      joke.id = uuid();
      return joke;
    });
    this.setState({ jokes: jokes, loading: false });
  }

  sortJokesByVotes(jokes) {
    let resultArr = jokes.slice(0);
    let change = true;
    while (change) {
      change = false;
      for (let i = 0; i < resultArr.length - 1; i++) {
        if (resultArr[i].votes < resultArr[i + 1].votes) {
          change = true;
          let temp = resultArr[i];
          resultArr[i] = resultArr[i + 1];
          resultArr[i + 1] = temp;
        }
      }
    }
    return resultArr;
  }

  handleUpVote(id) {
    this.setState(st => {
      //iterate through array and find joke obj with matching id, add to votes
      for (let i = 0; i < st.jokes.length; i++) {
        if (st.jokes[i].id === id) {
          st.jokes[i].votes++;
          break;
        }
      }
      //sort the whole array by vote count
      return { jokes: this.sortJokesByVotes(st.jokes) };
    });
  }

  handleDownVote(id) {
    this.setState(st => {
      //iterate through array and find joke obj with matching id, add to votes
      for (let i = 0; i < st.jokes.length; i++) {
        if (st.jokes[i].id === id) {
          st.jokes[i].votes--;
          break;
        }
      }
      //sort the whole array by vote count
      return { jokes: this.sortJokesByVotes(st.jokes) };
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="Board">
        {this.state.jokes.map(joke => {
          return (
            <Joke
              joke={joke.joke}
              key={joke.id}
              id={joke.id}
              votes={joke.votes}
              handleUpVote={this.handleUpVote}
              handleDownVote={this.handleDownVote}
            />
          );
        })}
      </div>
    );
  }
}

export default Board;

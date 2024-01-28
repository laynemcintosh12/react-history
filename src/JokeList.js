import React from 'react';
import Joke from './Joke';
import useJokeFetcher from './hooks/useJokeFetcher';
import useVoteHandler from './hooks/useVoteHandler';
import './JokeList.css';

/** List of jokes. */

// refactored to a functional component 

const JokeList = ({ numJokesToGet = 5 }) => {
  const { jokes, isLoading, generateNewJokes, setJokes } = useJokeFetcher(numJokesToGet);
  const { vote } = useVoteHandler();

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="JokeList">

      {isLoading ?
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
        :
        <div>
          <button
            className="JokeList-getmore"
            onClick={generateNewJokes}
          >
            Get New Jokes
          </button>

          {sortedJokes.map(j => (
            <Joke
              text={j.joke}
              key={j.id}
              id={j.id}
              votes={j.votes}
              vote={(id, delta) => vote(id, delta, setJokes)}
            />
          ))}
        </div>
      }

    </div>
  );
}

export default JokeList;

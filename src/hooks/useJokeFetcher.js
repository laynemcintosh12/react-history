import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useJokeFetcher = (numJokesToGet) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getJokes = useCallback(async () => {
    try {
      let newJokes = [];
      let seenJokes = new Set();

      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { joke, id } = res.data;

        if (!seenJokes.has(id)) {
          seenJokes.add(id);
          newJokes.push({ joke, id, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }

      setJokes(newJokes);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [numJokesToGet]);

  const generateNewJokes = () => {
    setIsLoading(true);
    getJokes();
  }

  useEffect(() => {
    getJokes();
  }, [getJokes]);

  return { jokes, isLoading, generateNewJokes, setJokes };
}

export default useJokeFetcher;

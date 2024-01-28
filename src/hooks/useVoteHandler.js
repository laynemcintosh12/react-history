const useVoteHandler = () => {
  const vote = (id, delta, setJokes) => {
    setJokes(allJokes => allJokes.map(
      j => j.id === id ? { ...j, votes: j.votes + delta } : j
    ));
  }

  return { vote };
}

export default useVoteHandler;

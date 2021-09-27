import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      }
      return res.json();
    })
    .then(data => {
      // console.log('data :>> ', data);
      setIsPending(false);
      setData(data);
      setError(null);
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.error('fetch aborted', err);
      } else {
        setIsPending(false);
        setError(err.message);
        console.error('Error loading data', err.message);
      }
    })

    // abort the fetch - why ??
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}

export default useFetch;
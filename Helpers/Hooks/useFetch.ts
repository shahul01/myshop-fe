import { useState, useEffect } from 'react';

const useFetch = (url: URL, fetchMethod='GET', formData=null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, {
      method: fetchMethod,
      signal: abortCont.signal,
      body: formData
    })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      }
      return res.json();
    })
    .then(data => {
      // console.log('data :>> ', data);
      setData(data);
      setError(null);
      setIsPending(false);
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
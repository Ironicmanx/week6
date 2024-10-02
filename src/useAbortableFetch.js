
import { useEffect, useState, useRef } from 'react';

// this is a custom hook that fetches data from a given URL


const useAbortableFetch = (url) => {
  const [json, setJson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef();

  useEffect(() => {
    if (!url) return;
    fetchData(url);

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [url]);

  const fetchData = async (url) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    setLoading(true);

    try {
      const response = await fetch(url, { signal });
      const data = await response.json();
      setJson(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { json, loading, error };
};

export default useAbortableFetch;

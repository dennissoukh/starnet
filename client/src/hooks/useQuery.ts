import { useEffect, useRef, useState } from 'react';

const useQuery = (query: string) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [response, setResponse] = useState<any>({});

  const fetchData = async () => {
    try {
      const url = `http://localhost:5050/${query}`;
      const res = await fetch(url);
      const dat = await res.json();

      setIsLoading(false);

      setResponse({
        endpoint: url,
        status: 200,
        error: false,
        type: Array.isArray(dat.data) ? 'array' : typeof dat,
        length: dat.data.length,
        data: dat.data,
      });
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    if (isMounted.current) {
      setIsLoading(true);
      fetchData();
    }
    return () => {
      isMounted.current = false;
    }
  });

  return {
    response,
    error,
    isLoading,
  }
}

export default useQuery;

import { useEffect, useRef, useState } from 'react';
import { Pagination } from '../types/common';

export const usePaginationQuery = (url: string, metadata: Pagination) => {
  const isMounted = useRef(true);
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (metadata && isMounted.current) {
      setPage(metadata.page);
      setIsLoading(true);
      fetchData(metadata.page);
    }

    return () => {
      isMounted.current = false;
    }
  });

  const fetchData = async (page: number) => {
    try {
      const query = buildUrl(url, page);
      const res = await fetch(query);
      const data = await res.json();
      setIsLoading(false);
      setResponse({
        endpoint: query,
        status: 200,
        error: false,
        type: Array.isArray(data.data) ? 'array' : typeof data,
        length: data.data.length,
        data: data.data,
        metadata: data.metadata,
      })
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  }

  const navigate = (direction: number = 1) => {
    setPage(page + direction);
    fetchData(page + direction);
  }

  const buildUrl = (model: string, page: number) => {
    return `http://localhost:5050/${model}/${page}/${metadata.count}`;
  }

  return {
    response,
    error,
    isLoading,
    setPage,
    page,
    navigate,
  }
}

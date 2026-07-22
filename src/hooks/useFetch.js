import { useEffect, useState, useCallback } from 'react';

export function useFetch(fetcherFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(() => {
    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    fetcherFn()
      .then((result) => {
        if (!isCancelled) setData(result);
      })
      .catch((err) => {
        if (!isCancelled) setError(err.message || 'Something went wrong');
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    const cancel = loadData();
    return cancel;
  }, [loadData]);

  return { data, isLoading, error, refetch: loadData };
}

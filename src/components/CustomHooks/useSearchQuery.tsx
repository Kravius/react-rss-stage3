import { useEffect, useState } from 'react';

const useSearchQuery = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  return { value, setValue };
};

export default useSearchQuery;

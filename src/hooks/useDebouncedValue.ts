import {useEffect, useState} from 'react';

const useDebouncedValue = (input: string = '', duration: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, duration);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debouncedValue;
};

export default useDebouncedValue;

import { useState, useEffect, SetStateAction } from 'react';

type StoredValue<T> = T;

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [StoredValue<T>, (value: SetStateAction<T>) => void] {
  const [storedValue, setStoredValue] = useState<StoredValue<T>>(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {}
    }
  }, [key]);

  function setValue(value: SetStateAction<T>): void {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {}
  }

  return [storedValue, setValue];
}

export default useLocalStorage;

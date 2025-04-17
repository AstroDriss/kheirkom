"use client";

import { useEffect, useState } from "react";

const useDebounce = <T,>(value: T, delay = 5200) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;

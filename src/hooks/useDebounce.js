import { useRef, useCallback } from "react";

export default function useDebounce(func, delay) {
  const timer = useRef();

  const debouncedFunc = useCallback(
    (...args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );

  return debouncedFunc;
}

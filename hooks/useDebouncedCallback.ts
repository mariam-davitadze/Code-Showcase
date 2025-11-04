import { useCallback, useRef } from "react";

/**
 * Custom React hook to debounce a callback function.
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns A debounced version of the callback
 */
const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay = 500
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export default useDebouncedCallback;


// example 
// const SearchInput = () => {
//   const handleSearch = (query: string) => {
//     console.log("Fetching data for:", query);
//   };

//   const debouncedSearch = useDebouncedCallback(handleSearch, 400);

//   return (
//     <input
//       type="text"
//       onChange={(e) => debouncedSearch(e.target.value)}
//       placeholder="Search items..."
//     />
//   );
// };

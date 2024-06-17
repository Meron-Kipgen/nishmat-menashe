import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!query) return; // Guard clause for empty or null query

    // Ensure the media query syntax is complete
    const mediaQuery = window.matchMedia(query);
    
    // Initial evaluation
    const handleChange = () => setMatches(mediaQuery.matches);
    handleChange(); 
    
    // Event listener for future changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;

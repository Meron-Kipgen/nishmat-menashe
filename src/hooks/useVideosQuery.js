import { useQuery } from '@tanstack/react-query'; // Correct import path
import { db } from '../db/config'; // Correct import path and object name

const fetchVideos = async () => {
  try {
    const response = await db.listDocuments('666aff03003ba124b787', '666aff1400318bf6aa6f'); // Correct method call
    return response.documents;
  } catch (error) {
    throw new Error('Failed to fetch videos'); // Throw an error to be caught by React Query
  }
};

const useVideosQuery = () => {
  const { data, isLoading, isError } = useQuery('videos', fetchVideos, {
    staleTime: 5 * 60 * 1000, // Configure caching options
    cacheTime: 30 * 60 * 1000,
  });

  return { data, isLoading, isError }; // Return the query result states
};

export default useVideosQuery;

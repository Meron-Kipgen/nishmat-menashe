import React, { createContext, useState, useEffect, useContext } from 'react';
import { db, client } from '../../db/config'; 

const databaseId = '666aff03003ba124b787';
const videoCollectionId = '666aff1400318bf6aa6f';
const audioCollectionId = '66af4006003ae36a8486';
const articleCollectionId = '666b0186000007f47da9';
const questionCollectionId = '66af4050002242fd5159';
const podcastCollectionId = '66af4050002242fd5159';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updatePosts = (updatedPosts) => {
    updatedPosts.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
    setPosts(updatedPosts);
  };

  const subscribeToCollection = (collectionId, type) => {
    return client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents`, (response) => {
      const { events, payload } = response;

      if (events.includes('databases.*.collections.*.documents.*.create')) {
        setPosts(prevPosts => {
          const newPosts = [{ ...payload, type }, ...prevPosts];
          updatePosts(newPosts);
          return newPosts;
        });
      }

      if (events.includes('databases.*.collections.*.documents.*.update')) {
        console.log('Update event:', payload);
        setPosts(prevPosts => {
          const updatedPosts = prevPosts.map(post => post.$id === payload.$id ? payload : post);
          updatePosts(updatedPosts);
          return updatedPosts;
        });
      }

      if (events.includes('databases.*.collections.*.documents.*.delete')) {
        console.log('Delete event:', payload);
        setPosts(prevPosts => {
          const updatedPosts = prevPosts.filter(post => post.$id !== payload.$id);
          updatePosts(updatedPosts);
          return updatedPosts;
        });
      }
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const videoResponse = await db.listDocuments(databaseId, videoCollectionId);
        const audioResponse = await db.listDocuments(databaseId, audioCollectionId);
        const articleResponse = await db.listDocuments(databaseId, articleCollectionId);
        const questionResponse = await db.listDocuments(databaseId, questionCollectionId);
        const podcastResponse = await db.listDocuments(databaseId, podcastCollectionId);

        const combinedPosts = [
          ...videoResponse.documents.map(doc => ({ ...doc, type: 'video' })),
          ...audioResponse.documents.map(doc => ({ ...doc, type: 'audio' })),
          ...articleResponse.documents.map(doc => ({ ...doc, type: 'article' })),
          ...questionResponse.documents.map(doc => ({ ...doc, type: 'QnA' })),
          ...podcastResponse.documents.map(doc => ({ ...doc, type: 'podcast' })),
        ];

        updatePosts(combinedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(`Error fetching posts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    const videoSubscription = subscribeToCollection(videoCollectionId, 'video');
    const audioSubscription = subscribeToCollection(audioCollectionId, 'audio');
    const articleSubscription = subscribeToCollection(articleCollectionId, 'article');
    const questionSubscription = subscribeToCollection(questionCollectionId, 'QnA');
    const podcastSubscription = subscribeToCollection(podcastCollectionId, 'podcast');

    return () => {
      if (videoSubscription) videoSubscription();
      if (audioSubscription) audioSubscription();
      if (articleSubscription) articleSubscription();
      if (questionSubscription) questionSubscription();
      if (podcastSubscription) podcastSubscription();
    };
  }, []);

  const contextValue = {
    posts,
    loading,
    error
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

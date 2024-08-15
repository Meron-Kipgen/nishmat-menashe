import { useState, useEffect, useCallback } from 'react';
import { db, client, ID } from "../../db/config"; // Importing from config.js
import { Query } from 'appwrite';

const databaseId = '666aff03003ba124b787';
const commentsCollectionId = '6693e16d0015537405c2'; // Replace with your comment collection ID

const useCommentsData = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await db.listDocuments(
        databaseId,
        commentsCollectionId,
        [
          Query.equal('postId', postId) // Query to filter comments by postId
        ]
      );
      setComments(response.documents);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();

    const commentsSubscription = client.subscribe(
      `databases.${databaseId}.collections.${commentsCollectionId}.documents`,
      (response) => {
        const { events, payload } = response;

        if (payload.postId !== postId) {
          return; // Ignore changes that don't match the current postId
        }

        if (events.includes('databases.*.collections.*.documents.*.create')) {
          setComments((prevComments) => {
            // Add new comment if it doesn't already exist
            if (prevComments.find((comment) => comment.$id === payload.$id)) {
              return prevComments;
            }
            return [...prevComments, payload];
          });
        }

        if (events.includes('databases.*.collections.*.documents.*.update')) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.$id === payload.$id ? payload : comment
            )
          );
        }

        if (events.includes('databases.*.collections.*.documents.*.delete')) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.$id !== payload.$id)
          );
        }
      }
    );

    // Clean up the subscription on unmount
    return () => {
      commentsSubscription(); // Unsubscribe when the component unmounts
    };
  }, [fetchComments, postId]);

  const createComment = async (userId, username, userAvatarUrl, comment) => {
    try {
      const response = await db.createDocument(
        databaseId,
        commentsCollectionId,
        ID.unique(),
        {
          userId,
          userName: username,
          avatarUrl: userAvatarUrl,
          postId,
          comment,
        }
      );
      setComments((prevComments) => [...prevComments, response]);
    } catch (err) {
      setError(err);
    }
  };

  const updateComment = async (commentId, newComment) => {
    try {
      const response = await db.updateDocument(
        databaseId,
        commentsCollectionId,
        commentId,
        {
          comment: newComment,
        }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.$id === commentId ? response : comment
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
    
      await db.deleteDocument(databaseId, commentsCollectionId, commentId);
   
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.$id !== commentId)
      );
    } catch (err) {
      console.error(`Error deleting comment with ID: ${commentId}`, err);
      setError(err);
    }
  };
  

  return { comments, loading, error, createComment, updateComment, deleteComment };
};

export default useCommentsData;

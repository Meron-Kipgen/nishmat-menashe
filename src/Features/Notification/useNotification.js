import { useState, useEffect } from 'react';
import { db } from '../../db/config'; // Import your Appwrite client setup

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await db.listDocuments('666aff03003ba124b787', 'your_notifications_collection_id');
        setNotifications(response.documents);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, loading, error };
};

export default useNotifications;

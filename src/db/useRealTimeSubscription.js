import { useEffect, useState } from "react";
import { db, client } from "./config";

const useRealTimeSubscription = (databaseId, collectionId) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await db.listDocuments(databaseId, collectionId);
        setData(response.documents);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();

    const subscription = client.subscribe(
      `databases.${databaseId}.collections.${collectionId}.documents`,
      (response) => {
        const { events, payload } = response;

        // Handle creation event
        if (events.includes("databases.*.collections.*.documents.*.create")) {
          setData((prevData) => {
            if (prevData.find((item) => item.$id === payload.$id)) {
              return prevData; // Item already exists, no need to add
            }
            return [...prevData, payload]; // Add new item
          });
        }

        // Handle update event
        if (events.includes("databases.*.collections.*.documents.*.update")) {
          setData((prevData) =>
            prevData.map((item) =>
              item.$id === payload.$id ? payload : item // Update existing item
            )
          );
        }

        // Handle deletion event
        if (events.includes("databases.*.collections.*.documents.*.delete")) {
          setData((prevData) =>
            prevData.filter((item) => item.$id !== payload.$id) // Remove deleted item
          );
        }
      }
    );

    return () => {
      // Ensure subscription is properly unsubscribed
      subscription(); // Assuming `subscription` is a function to unsubscribe
    };
  }, [databaseId, collectionId]);

  return [data, setData];
};

export default useRealTimeSubscription;

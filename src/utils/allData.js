import { db } from "../db/config";

export const fetchDataFromCollections = async (collections) => {
  let allData = [];

  for (const collection of collections) {
    try {
      const response = await db.listDocuments(collection.databaseId, collection.collectionId);
      allData = [...allData, ...response.documents.map(doc => ({ ...doc, collection: collection.name }))];
    } catch (error) {
      console.error(`Error fetching data from ${collection.name}:`, error);
      
    }
  }

  return allData;
};

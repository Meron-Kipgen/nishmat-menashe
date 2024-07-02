import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../db/config';

const DataContext = createContext();

const fetchDocuments = async () => {
  const response = await db.listDocuments('666aff03003ba124b787', '666aff1400318bf6aa6f');
  return response.documents;
};

export const DataProvider = ({ children }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['Videos'],
    queryFn: fetchDocuments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading videos.</div>;
  }

  return (
    <DataContext.Provider value={{ videoLists: data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

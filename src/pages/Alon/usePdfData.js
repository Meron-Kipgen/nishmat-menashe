import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID } from '../../db/config'; // Assuming your Appwrite config
import useRealTimeSubscription from '../../db/useRealTimeSubscription'; // Assuming a custom hook for real-time data

// Replace with your actual IDs
const databaseId = '666aff03003ba124b787';
const pdfCollectionId = '66d9a48c002e16bb094e';

const PdfDataContext = createContext();

export const usePdfData = () => {
    const context = useContext(PdfDataContext);
    if (!context) {
        throw new Error('usePdfData must be used within a PdfDataProvider');
    }
    return context;
};

export const PdfDataProvider = ({ children }) => {
    const [pdfData, setPdfData] = useRealTimeSubscription(databaseId, pdfCollectionId); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (pdfData.length > 0) {
            setLoading(false);
        }
    }, [pdfData]);

    const addPdf = async (newPdf) => {
        try {
            await db.createDocument(databaseId, pdfCollectionId, ID.unique(), newPdf);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updatePdf = async (pdfId, updatedData) => {
        if (!pdfId || !updatedData) {
            console.error('Invalid pdfId or updatedData', { pdfId, updatedData });
            return;
        }
    
        try {
            console.log('Updating PDF with ID:', pdfId);
            console.log('Updated Data:', updatedData);
    
            await db.updateDocument(databaseId, pdfCollectionId, pdfId, updatedData);
            setPdfData(prevData =>
                prevData.map(pdf =>
                    pdf.$id === pdfId ? { ...pdf, ...updatedData } : pdf
                )
            );
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    
    

    const deletePdf = async (pdfId) => {
        if (!pdfId) {
            throw new Error('Missing documentId');
        }
        
        try {
            await db.deleteDocument(databaseId, pdfCollectionId, pdfId);
            setPdfData(prevData =>
                prevData.filter(pdf => pdf.$id !== pdfId)
            );
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    

    const contextValue = {
        pdfData,
        loading,
        error,
        addPdf,
        updatePdf,
        deletePdf,
    };

    return (
        <PdfDataContext.Provider value={contextValue}>
            {children}
        </PdfDataContext.Provider>
    );
};

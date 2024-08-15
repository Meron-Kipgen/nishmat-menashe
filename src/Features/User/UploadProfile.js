import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ID, storage, account } from '../../db/config'; // Adjust the path as needed
import { UserContext } from '../../contexts/UserContext';
import DeleteAvatar from './DeleteAvatar'; // Import the new component

const Container = styled.div`


  align-items: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FileInput = styled.input`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
`;

const UploadButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const UploadProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const projectId = '666acc380020b2ed30c6';
      const bucketId = '66bcc6e60020eb688be5'; // Correct bucket ID
      const fileId = ID.unique(); // Generate a unique file ID
      const uploadResponse = await storage.createFile(bucketId, fileId, file);

      const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uploadResponse.$id}/view?project=${projectId}&mode=admin`;
      const updatedPrefs = { ...userInfo.prefs, avatar: fileUrl };
      await account.updatePrefs(updatedPrefs);

      setUserInfo(prevInfo => ({ ...prevInfo, avatar: fileUrl }));
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
      <FileInput type="file" onChange={handleFileChange} />
      <UploadButton onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Profile Picture'}
      </UploadButton>
      <DeleteAvatar /> {/* Include the DeleteAvatar component */}
    </Container>
  );
};

export default UploadProfile;

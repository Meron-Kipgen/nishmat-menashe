// UploadProfile.js
import React, { useState, useContext } from 'react';
import { ID, storage, account } from '../../db/config'; // Adjust the path as needed
import { UserContext } from '../../contexts/UserContext';

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
      const projectId = '666acc380020b2ed30c6'
      const bucketId = '66bcc6e60020eb688be5'; // Correct bucket ID
      const fileId = ID.unique(); // Generate a unique file ID
      const uploadResponse = await storage.createFile(bucketId, fileId, file);
      console.log('Upload response:', uploadResponse);

      // Extract previous file ID and delete if exists
      if (userInfo.avatar) {
        const previousFileId = userInfo.avatar.split('/').pop().split('?')[0]; // Extract the file ID from the URL
        console.log('Previous file ID:', previousFileId);

        try {
          await storage.deleteFile(bucketId, previousFileId);
          console.log('Previous file deleted successfully');
        } catch (deleteError) {
          console.error('Failed to delete previous file:', deleteError);
        }
      }

      // Update user preferences with new profile picture URL
      const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uploadResponse.$id}/view?project=${projectId}&mode=admin`;
      const updatedPrefs = { ...userInfo.prefs, avatar: fileUrl };
      await account.updatePrefs(updatedPrefs);
      console.log('User preferences updated:', updatedPrefs);

      // Update local user info context
      setUserInfo(prevInfo => ({ ...prevInfo, avatar: fileUrl }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Upload failed: ${error.message}`); // Show detailed error message
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Profile Picture'}
      </button>
    </div>
  );
};

export default UploadProfile;

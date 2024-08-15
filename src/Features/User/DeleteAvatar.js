import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { storage, account } from '../../db/config'; // Adjust the path as needed
import { UserContext } from '../../contexts/UserContext';

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #c82333;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const DeleteAvatar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!userInfo.prefs.avatar) return;

    setDeleting(true);

    try {
      // Extract file ID from the URL
      const fileUrl = userInfo.prefs.avatar;
      const fileIdMatch = fileUrl.match(/files\/(.*?)\/view/);
      if (!fileIdMatch) throw new Error('File ID not found in URL');
      const fileId = fileIdMatch[1];

      const bucketId = '66bcc6e60020eb688be5'; // Correct bucket ID

      // Attempt to delete the file from storage
      await storage.deleteFile(bucketId, fileId);

      // Update user preferences to remove the avatar URL
      const updatedPrefs = { ...userInfo.prefs, avatar: '' };
      await account.updatePrefs(updatedPrefs);

      setUserInfo(prevInfo => ({ ...prevInfo, avatar: '' }));
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Deletion failed:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    userInfo.prefs.avatar && (
      <DeleteButton onClick={handleDelete} disabled={deleting}>
        {deleting ? 'Deleting...' : 'Delete Profile Picture'}
      </DeleteButton>
    )
  );
};

export default DeleteAvatar;

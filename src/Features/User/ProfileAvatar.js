import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar'; // Adjust the path as needed
import { UserContext } from '../../contexts/UserContext';
import { CameraIcon } from '../../Assets/Icons';
import UploadProfile from './UploadProfile'; // Adjust the path as needed
import DeleteAvatar from './DeleteAvatar';

const AvatarContainerWrapper = styled.div`
  position: relative;
  margin-top: 150px;
  margin-left: 250px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Username = styled.p`
  font-size: 2.5rem;
  color: white;
`;

const UploadAvatar = styled.div`
  position: absolute;
  cursor: pointer;
`;

const ProfileCover = styled.div`
  height: 300px;
  width: 100%;
  background: #EE5253;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  bottom: 50px; // Adjust based on your layout
  right: 10px; // Align with the camera icon
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const ProfileAvatar = () => {
  const { userAvatarUrl, username } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCameraClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDeleteClick = () => {
    setMenuOpen(false);
    setShowDelete(true); // Show DeleteAvatar component
  };

  const handleUploadClick = () => {
    setMenuOpen(false);
    setShowUpload(true); // Show UploadProfile component
  };

  return (
    <ProfileCover>
      <AvatarContainerWrapper>
        <Avatar src={userAvatarUrl} name={username} width={"200px"} height={"200px"} border={"5px solid white"} />
        <Username>{username}</Username>
        <UploadAvatar onClick={handleCameraClick}>
          <CameraIcon width="30px" height="30px" stroke="red"/>
        </UploadAvatar>
        <DropdownMenu show={menuOpen}>
          <MenuItem onClick={handleDeleteClick}>Delete Profile Picture</MenuItem>
          <MenuItem onClick={handleUploadClick}>Upload New Picture</MenuItem>
        </DropdownMenu>
      </AvatarContainerWrapper>
   
      {showUpload && <UploadProfile />}
      {showDelete && <DeleteAvatar />}
    </ProfileCover>
  );
};

export default ProfileAvatar;

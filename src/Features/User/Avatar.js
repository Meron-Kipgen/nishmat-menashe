import React from 'react';
import styled from 'styled-components';
import { generateGradient } from '../../utils/randomGradient';

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-top: -75px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  color: #fff;
  background-color: #333;
  background-image: ${({ src, name }) => src ? `url(${src})` : generateGradient(name || 'Default Name')};
  background-size: cover;
  background-position: center;
`;

const Initials = styled.div`
  font-size: 17px; /* Ensure this is applied correctly */
  color: #fff;
`;

const getInitials = (name) => {
  if (!name) return '?'; // Return a placeholder if name is undefined
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part[0]).join('');
  return initials.toUpperCase();
};

const Avatar = ({ src, name }) => {
  return (
    <AvatarWrapper src={src} name={name}>
      {!src && <Initials>{getInitials(name)}</Initials>}
    </AvatarWrapper>
  );
};

export default Avatar;

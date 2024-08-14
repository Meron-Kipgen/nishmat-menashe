import React from 'react';
import styled from 'styled-components';
import { generateGradient } from '../../utils/randomGradient';

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  font-weight: 600;
  color: #fff;
  background-image: ${({ src, name }) => src ? `url(${src})` : generateGradient(name || 'Default Name')};
  background-size: cover;
  background-position: center;
`;

const Initials = styled.div`
  font-size: 17px;
  color: #fff;
`;

const getInitials = (name) => {
  if (!name) return '?';
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

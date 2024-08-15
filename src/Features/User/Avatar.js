import React, { useContext } from 'react';
import styled from 'styled-components';
import { generateGradient } from '../../utils/randomGradient';
import { UserContext } from '../../contexts/UserContext';
import { GuestIcon } from '../../Assets/Icons';

const AvatarWrapper = styled.div`
  width: ${({ width }) => width || '40px'};
  height: ${({ height }) => height || '40px'};
  border-radius: 50%;
  border: ${({ border }) => border || '2px solid green'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize || '6rem'};
  font-weight: 600;
  color: #fff;
  background-image: ${({ src, name }) => src ? `url(${src})` : generateGradient(name || 'Default Name')};
  background-size: cover;
  background-position: center;
`;

const Initials = styled.div`
  font-size: ${({ fontSize }) => fontSize || '17px'};
  color: #fff;
`;

const getInitials = (name) => {
  if (!name) return '?';
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part[0]).join('');
  return initials.toUpperCase();
};

const Avatar = ({ src, name, width, height, border }) => {
  const { isLogin } = useContext(UserContext);
  
  return (
    <AvatarWrapper src={src} name={name} width={width} height={height} border={border}>
      {isLogin ? (
        !src && <Initials>{getInitials(name)}</Initials>
      ) : (
        <GuestIcon width="30px" height="30px" stroke="white" />
      )}
    </AvatarWrapper>
  );
};

export default Avatar;

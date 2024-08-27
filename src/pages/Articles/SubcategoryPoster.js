import React from 'react';
import styled from 'styled-components';


const SubcategoryContainer = styled.div`
  height: 100px;
 border: 1px solid #ccc;
  border-radius: 10px;
  color: black;
  font-size: 1.4rem;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 10px;
 
  position: relative;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
`;

const SubcategoryPoster = ({ children, subcategory }) => {
  return (
    <SubcategoryContainer subcategory={subcategory}>
      <TextOverlay>{children}</TextOverlay>
    </SubcategoryContainer>
  );
};

export default SubcategoryPoster;

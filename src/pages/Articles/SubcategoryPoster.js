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

  background-color: #e5e5f7;
opacity: 0.8;
background-image: linear-gradient(45deg, #ffffff 25%, #f2f2f2 25%, #f2f2f2 50%, #ffffff 50%, #ffffff 75%, #f2f2f2 75%, #f2f2f2 100%);
background-size: 56.57px 56.57px;
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

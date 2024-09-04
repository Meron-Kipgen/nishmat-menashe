import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  top: 10px; /* Adjusted top position */
  z-index: 100;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding-left: 5px;
  gap: 10px;
  overflow-x: auto; 
  overflow-y: hidden; 
  max-width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none; 
 
`;

const Button = styled.button`
  border-radius: 20px;
  border: none;
  background-color: rgb(68, 174, 98);
  color: white;
  padding: 9px 15px;
  white-space: nowrap;
  font-size: 1rem;
`;

export default function MobileBtn({
  onClickRelated,
  onClickSuggestion,
}) {
  const handleClickRelated = () => {
    onClickRelated(); 
  };

  const handleClickSuggestion = () => {
    onClickSuggestion(); 
  };

  return (
    <Container>
      <ButtonContainer>
        <Button>back</Button>

     <Button>Comments</Button>
        <Button onClick={handleClickRelated}>
          Related
        </Button>
      
        <Button onClick={handleClickSuggestion}>
          Suggestion
        </Button>
      
        <Button>share</Button>
     
      </ButtonContainer>
    </Container>
  );
}

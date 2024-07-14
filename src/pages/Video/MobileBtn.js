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
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Hide vertical scrollbar */
  max-width: 100%; /* Ensure the container doesn't overflow horizontally */
  -ms-overflow-style: none; /* IE and Edge specific: hide scrollbar */
  scrollbar-width: none; /* Firefox specific: hide scrollbar */
  /* Adjust height as needed */
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
    onClickRelated(); // Call the onClickRelated function passed from Details component
  };

  const handleClickSuggestion = () => {
    onClickSuggestion(); // Call the onClickSuggestion function passed from Details component
  };

  return (
    <Container>
      <ButtonContainer>
        <Button># Like</Button>
        <Button># Share</Button>
        <Button onClick={handleClickRelated}>
          # Related
        </Button>
        {/* Call onClickRelated when Related button is clicked */}
        <Button onClick={handleClickSuggestion}>
          # Suggestion
        </Button>
        {/* Call onClickSuggestion when Suggestion button is clicked */}
        <Button># Another Button</Button>
        <Button># More Buttons</Button>
      </ButtonContainer>
    </Container>
  );
}

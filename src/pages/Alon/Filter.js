import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: auto auto auto; 
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%; 

`;


const LastInput = styled(Input)`
  @media (max-width: 768px) {
    grid-column: span 2; 
  }
`;

export default function Filter({ filters, onInputChange }) {
  return (
    <Wrapper>
      <Input
        type="text"
        name="volume"
        value={filters.volume}
        onChange={onInputChange}
        placeholder="Filter by Volume"
      />
      <Input
        type="text"
        name="issue"
        value={filters.issue}
        onChange={onInputChange}
        placeholder="Filter by Issue"
      />
      <LastInput
        type="text"
        name="parasha"
        value={filters.parasha}
        onChange={onInputChange}
        placeholder="Filter by Parasha"
      />
    </Wrapper>
  );
}

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`

  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
 
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
      <Input
        type="text"
        name="parasha"
        value={filters.parasha}
        onChange={onInputChange}
        placeholder="Filter by Parasha"
      />
    </Wrapper>
  );
}

import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  margin: 20px auto;
  display: block;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin: 20px 0;
  color: #888;
`;

const LoadMore = ({ onClick, loading, hasMore }) => {
  if (loading) {
    return <LoadingMessage>Loading more posts...</LoadingMessage>;
  }

  if (!hasMore) {
    return <LoadingMessage>No more posts to load.</LoadingMessage>;
  }

  return <Button onClick={onClick}>Load More</Button>;
};

export default LoadMore;

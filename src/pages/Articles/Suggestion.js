import React from "react";
import styled from "styled-components";

const SuggestionContainer = styled.div`
  width: 400px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const SuggestionTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
`;

const SuggestionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SuggestionItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

const Suggestion = ({ author, category, subcategory, postId, postData }) => {

  const suggestions = postData.filter(
    post =>
      post.author === author &&
      post.category === category &&
      post.subcategory === subcategory &&
      post.$id !== postId
  );
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <SuggestionContainer>
      <SuggestionTitle>More from {author}</SuggestionTitle>
      <SuggestionList>
        {suggestions.map(post => (
          <SuggestionItem key={post.$id}>
            {post.title}
          </SuggestionItem>
        ))}
      </SuggestionList>
    </SuggestionContainer>
  );
};

export default Suggestion;

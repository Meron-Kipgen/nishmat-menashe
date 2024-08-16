import React from 'react';
import styled from 'styled-components';

const CommentContainer = styled.p`
  margin-top: 10px;
  word-wrap: break-word;     
  overflow-wrap: break-word;
  word-break: break-word;  
`;

const CommentContent = ({ text, expandedLength, maxLength }) => (
  <CommentContainer>
    {text.length > maxLength ? text.slice(0, expandedLength || maxLength) : text}
  </CommentContainer>
);

export default CommentContent;

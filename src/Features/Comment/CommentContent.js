import React from 'react';
import styled from 'styled-components';

const CommentContainer = styled.p`
  margin-top: 10px;
  word-wrap: break-word;     
  overflow-wrap: break-word;
  word-break: break-word;  
`;

const CommentContent = ({ text = '', expandedLength = 0, maxLength = 500 }) => {
  // Ensure text is a string and provide a default value if not
  const safeText = typeof text === 'string' ? text : '';

  return (
    <CommentContainer>
      {safeText.length > maxLength
        ? safeText.slice(0, expandedLength || maxLength)
        : safeText}
    </CommentContainer>
  );
};

export default CommentContent;

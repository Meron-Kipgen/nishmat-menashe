import React from 'react';
import styled from 'styled-components';

const ShareBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  background: #007bff;
  padding: 5px;
  color: white;
  border-radius: 40px;
  cursor: pointer;
  text-align: center;
`;

const ShareButton = ({ url, title, text, children }) => {
  const limitTextToFiveLines = (text) => {
    const lines = text.split('\n');
    const limitedLines = lines.slice(0, 5);
    const trimmedText = limitedLines.join('\n');
    
    return trimmedText.length > 300 ? `${trimmedText.substring(0, 300)}...` : trimmedText;
  };

  const handleShareClick = () => {
    const shareData = {
      title: title || 'Check this out!',
      text: limitTextToFiveLines(text || 'You might find this interesting.'),
      url: url,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      const contentToCopy = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
      navigator.clipboard.writeText(contentToCopy)
        .then(() => {
          alert('Link and text copied to clipboard! You can manually share it.');
        })
        .catch((err) => {
          console.error('Error copying to clipboard:', err);
        });
    } else {
      alert(`This browser doesn't support the Share or Clipboard API. Copy this link to share: ${url}`);
    }
  };

  return <ShareBtn onClick={handleShareClick}>{children || 'Share'}</ShareBtn>;
};

export default ShareButton;

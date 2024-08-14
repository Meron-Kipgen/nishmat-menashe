import React from 'react';

// Function to copy text to the clipboard
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => alert('Link copied to clipboard!'),
    (err) => console.error('Failed to copy text: ', err)
  );
};

const Share = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Social media share URLs
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', width: '300px' }}>
      {/* Facebook Share Button */}
      <a href={facebookShare} target="_blank" rel="noopener noreferrer">
        <button>Share on Facebook</button>
      </a>
      
      {/* Twitter Share Button */}
      <a href={twitterShare} target="_blank" rel="noopener noreferrer">
        <button>Share on Twitter</button>
      </a>
      
      {/* WhatsApp Share Button */}
      <a href={whatsappShare} target="_blank" rel="noopener noreferrer">
        <button>Share on WhatsApp</button>
      </a>
      
      {/* Copy Link Button */}
      <button onClick={() => copyToClipboard(url)}>Copy Link</button>
    </div>
  );
};

export default Share;

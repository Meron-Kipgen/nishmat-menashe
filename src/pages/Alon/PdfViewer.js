// PdfViewer.js
import React from 'react';

const PdfViewer = ({ url }) => {
  return (
    <div>
      <iframe
        src={url}
        width="100%"
        height="600px"
        style={{ border: 'none' }}
        title="PDF Viewer"
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => window.open(url, '_blank')}>View PDF</button>
        <button onClick={() => {
          const link = document.createElement('a');
          link.href = url;
          link.download = url.substring(url.lastIndexOf('/') + 1);
          link.click();
        }}>Download PDF</button>
      </div>
    </div>
  );
};

export default PdfViewer;

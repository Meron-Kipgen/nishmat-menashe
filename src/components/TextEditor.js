import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DOMPurify from 'dompurify';

const GlobalStyle = createGlobalStyle`
  body.fullscreen-mode {
    overflow: hidden;
  }
`;

const EditorContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  position: relative;
  ${({ fullscreen }) => fullscreen && `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 9999;
    overflow: hidden;
  `}
`;

const MenuBar = styled.div`
  background-color: #f0f0f0;
  padding: 8px;
  border-bottom: 1px solid #ced4da;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
`;

const FormatButtons = styled.div`
  display: flex;
`;

const FormatButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ffffff;
  &:hover {
    background-color: #e9ecef;
  }
`;

const FullscreenButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ffffff;
  &:hover {
    background-color: #e9ecef;
  }
`;

const ContentEditable = styled.div`
  padding: 16px;
  min-height: 150px;
  overflow-y: auto;
  white-space: pre-wrap;
  outline: none;
  background: #e0dddd;
  margin: 0 auto;
  width: ${({ fullscreen }) => fullscreen ? '800px' : 'auto'};
  height: ${({ fullscreen }) => fullscreen ? 'calc(100vh - 80px)' : '150px'};
  unicode-bidi: embed;
  ${({ fullscreen }) => fullscreen && `
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  `}
`;

const TextEditor = ({ value, onChange }) => {
  const [body, setBody] = useState(value || '');
  const [fullscreen, setFullscreen] = useState(false);
  const contentEditableRef = useRef(null);

  useEffect(() => {
    setBody(value || '');
  }, [value]);

  useEffect(() => {
    if (fullscreen) {
      document.body.classList.add('fullscreen-mode');
    } else {
      document.body.classList.remove('fullscreen-mode');
    }
  }, [fullscreen]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      return range;
    }
    return null;
  };

  const restoreSelection = range => {
    if (range) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const handleFormat = (e, format) => {
    e.preventDefault(); // Ensure default action is prevented
    const range = saveSelection();
    document.execCommand(format);
    restoreSelection(range);
    contentEditableRef.current.focus();
    onChange(contentEditableRef.current.innerHTML);
  };

  const handlePaste = e => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const sanitizedText = DOMPurify.sanitize(text);

    document.execCommand('insertText', false, sanitizedText);
    setBody(contentEditableRef.current.innerHTML);
    onChange(contentEditableRef.current.innerHTML);
  };

  const handleChange = () => {
    const sanitizedHTML = DOMPurify.sanitize(contentEditableRef.current.innerHTML);
    setBody(sanitizedHTML);
    onChange(sanitizedHTML);
  };

  const toggleFullscreen = e => {
    e.preventDefault();
    setFullscreen(prevFullscreen => !prevFullscreen);
  };

  return (
    <EditorContainer fullscreen={fullscreen}>
      <GlobalStyle />
      <MenuBar>
        <FormatButtons>
          <FormatButton onClick={(e) => handleFormat(e, 'bold')}>Bold</FormatButton>
          <FormatButton onClick={(e) => handleFormat(e, 'italic')}>Italic</FormatButton>
          <FormatButton onClick={(e) => handleFormat(e, 'justifyLeft')}>Left</FormatButton>
          <FormatButton onClick={(e) => handleFormat(e, 'justifyCenter')}>Center</FormatButton>
          <FormatButton onClick={(e) => handleFormat(e, 'justifyRight')}>Right</FormatButton>
          <FormatButton onClick={(e) => handleFormat(e, 'justifyFull')}>Justify</FormatButton>
        </FormatButtons>
        <FullscreenButton onClick={toggleFullscreen}>
          {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </FullscreenButton>
      </MenuBar>
      <ContentEditable
        ref={contentEditableRef}
        id="editor-contenteditable"
        contentEditable
        onBlur={handleChange}
        onPaste={handlePaste}
        fullscreen={fullscreen}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
      />
    </EditorContainer>
  );
};

export default TextEditor;

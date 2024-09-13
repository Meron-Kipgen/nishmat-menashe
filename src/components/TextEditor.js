import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import styled, { createGlobalStyle } from "styled-components";
import { MaximizeIcon, MinimizeIcon } from "../Assets/Icons";

const GlobalStyle = createGlobalStyle`
  body.fullscreen-mode {
    overflow: hidden;
  }
`;

const EditorContainer = styled.div`
  height: ${props => (props.fullscreen ? 'calc(100vh - 60px)' : 'auto')};

  position: ${props => (props.fullscreen ? 'fixed' : 'relative')};
  top: ${props => (props.fullscreen ? '0' : 'initial')};
  left: ${props => (props.fullscreen ? '0' : 'initial')};
  width: ${props => (props.fullscreen ? '100%' : '100%')};
  background-color: #ffffff;
  z-index: ${props => (props.fullscreen ? '9999' : 'initial')};
  overflow: hidden;
  box-shadow: ${props => (props.fullscreen ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: all 0.3s ease;
`;

const FullscreenButton = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  padding: 10px 0 0 10px;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const TextEditor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value || "");
  const [fullscreen, setFullscreen] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    setEditorValue(value || "");
  }, [value]);

  useEffect(() => {
    if (fullscreen) {
      document.body.classList.add("fullscreen-mode");
    } else {
      document.body.classList.remove("fullscreen-mode");
    }
  }, [fullscreen]);

  const handleChange = value => {
    setEditorValue(value);
    onChange(value);
  };

  const toggleFullscreen = e => {
    e.preventDefault();
    setFullscreen(prevFullscreen => !prevFullscreen);
  };

  return (
    <EditorContainer fullscreen={fullscreen}>
      <GlobalStyle />
      <MenuContainer>
        <FullscreenButton onClick={toggleFullscreen}>
          {fullscreen ? <MinimizeIcon height={20} width={20}/>: <MaximizeIcon height={20} width={20}/>}
        </FullscreenButton>
      </MenuContainer>
      <ReactQuill
        ref={quillRef}
        value={editorValue}
        onChange={handleChange}
        placeholder="Enter some text..."
        modules={{
          toolbar: [
            [{ font: [] }],
            ["bold", "italic"],
            [
              { align: "" },
              { align: "center" },
              { align: "right" },
              { align: "justify" },
            ],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ direction: "rtl" }],
            ["link"],
            ["clean"],
          ],
        }}
        style={{ height: "100%", width: "100%" }}
      />
    </EditorContainer>
  );
};

export default TextEditor;

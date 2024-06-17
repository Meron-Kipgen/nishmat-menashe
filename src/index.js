import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import App from "./App";
import { createGlobalStyle } from "styled-components";

// Define global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

 html ,body {
    background: linear-gradient(135deg, rgba(173, 216, 230, 8) 100%, rgba(224, 255, 255, 8) 50%, rgba(240, 248, 255, 8) 10%);
    font-family: 'Roboto', sans-serif;
    overscroll-behavior-y: contain;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

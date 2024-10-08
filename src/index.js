import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { UserProvider } from "./contexts/UserContext";


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html ,body {
    background: #D6D6D6;
    font-family: 'Roboto', sans-serif;
    overscroll-behavior-y: contain;
  }
`;



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
 
      <GlobalStyle />
      <UserProvider>

        <App />  
      </UserProvider>
    

  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from "./contexts/UserContext";
// Define global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html ,body {
    background: #eeecec;
    font-family: 'Roboto', sans-serif;
    overscroll-behavior-y: contain;
  }
`;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <UserProvider>

        <App />  
      </UserProvider>
    
    </QueryClientProvider>
  </React.StrictMode>
);

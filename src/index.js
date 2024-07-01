import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Define global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html ,body {
    background: linear-gradient(135deg, rgba(173, 216, 230, 0.8) 100%, rgba(224, 255, 255, 0.5) 50%, rgba(240, 248, 255, 0.1) 10%);
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
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

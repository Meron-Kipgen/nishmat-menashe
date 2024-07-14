import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import DataContextProvider from "./contexts/DataContextProvider";
import { BookDataProvider } from "./pages/Books/useBookData";

export default function App() {
  return (
    <DataContextProvider>
      <BookDataProvider>
      <RouterProvider router={routers} />
      </BookDataProvider>
    </DataContextProvider>
  );
}

import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import DataContextProvider from "./contexts/videosDataContext";

export default function App() {
  return (
    <DataContextProvider>
      <RouterProvider router={routers} />
    </DataContextProvider>
  );
}

import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import { DataProvider } from "./contexts/videosDataContext";

export default function App() {
  return(
    <DataProvider>
      <RouterProvider router={routers} />
    </DataProvider>
  ) 
}

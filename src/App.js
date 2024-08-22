import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import Providers from "./Providers";

const App = () => {
  return (
    <Providers>
      <RouterProvider router={routers} />
    </Providers>
  );
};

export default App;

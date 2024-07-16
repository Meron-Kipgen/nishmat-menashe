import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import DataContextProvider from "./contexts/DataContextProvider";
import { BookDataProvider } from "./pages/Books/useBookData";
import { ArticlesDataProvider } from "./pages/Articles/useArticlesData";

const App = () => {
  return (
    <DataContextProvider>
      <BookDataProvider>
        <ArticlesDataProvider>
          <RouterProvider router={routers} />
        </ArticlesDataProvider>
      </BookDataProvider>
    </DataContextProvider>
  );
};

export default App;

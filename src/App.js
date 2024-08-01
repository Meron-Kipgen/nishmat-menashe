import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import { VideosDataProvider } from "./pages/Video/useVideosData";
import { BookDataProvider } from "./pages/Books/useBookData";
import { ArticlesDataProvider } from "./pages/Articles/useArticlesData";
 import { CategoryProvider } from "./contexts/CategoriesToggle";
const App = () => {
  return (
    <VideosDataProvider>
      <BookDataProvider>
        <ArticlesDataProvider>
          <CategoryProvider>
            <RouterProvider router={routers} />
          </CategoryProvider>
        </ArticlesDataProvider>
      </BookDataProvider>  
    </VideosDataProvider>
  );
};

export default App;

import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import { VideosDataProvider } from "./pages/Video/useVideosData";
import { BookDataProvider } from "./pages/Books/useBookData";
import { ArticlesDataProvider } from "./pages/Articles/useArticlesData";
 import { CategoryProvider } from "./contexts/CategoriesToggle";
import { PostsProvider } from "./pages/Feed/usePosts";
const App = () => {
  return (
    <PostsProvider>
    <VideosDataProvider>
      <BookDataProvider>
        <ArticlesDataProvider>
          <CategoryProvider>
            <RouterProvider router={routers} />
          </CategoryProvider>
        </ArticlesDataProvider>
      </BookDataProvider>  
    </VideosDataProvider>
    </PostsProvider>
  );
};

export default App;

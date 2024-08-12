import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import { VideosDataProvider } from "./pages/Video/useVideosData";
import { BookDataProvider } from "./pages/Books/useBookData";
import { ArticlesDataProvider } from "./pages/Articles/useArticlesData";
 import { CategoryProvider } from "./contexts/CategoriesToggle";
import { PostsProvider } from "./pages/Feed/usePosts";
import { AudioDataProvider } from "./pages/Audio/useAudioData";
import { PodcastDataProvider } from "./pages/Audio/Podcast/usePodcastData";
const App = () => {
  return (
    <PostsProvider>
    <VideosDataProvider>
      <AudioDataProvider>
      <BookDataProvider>
        <PodcastDataProvider>
        <ArticlesDataProvider>
          <CategoryProvider>
            <RouterProvider router={routers} />
          </CategoryProvider>
        </ArticlesDataProvider>
        </PodcastDataProvider>
      </BookDataProvider> 
      </AudioDataProvider> 
    </VideosDataProvider>
    </PostsProvider>
  );
};

export default App;

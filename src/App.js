import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routes";
import { VideosDataProvider } from "./pages/Video/useVideosData";
import { BookDataProvider } from "./pages/Books/useBookData";
import { ArticlesDataProvider } from "./pages/Articles/useArticlesData";

import { PostsProvider } from "./pages/Feed/usePosts";
import { AudioDataProvider } from "./pages/Audio/useAudioData";
import { PodcastDataProvider } from "./pages/Audio/Podcast/usePodcastData";
import { QuestionAnswerDataProvider } from "./pages/QuestionAnswer/useQuestionAnswerData";
import { EpisodeDataProvider } from "./pages/Audio/Podcast/useEpisodeData";
import { FeedbackDataProvider } from "./Features/Feedback/useFeedbackData";
const App = () => {
  return (
    <PostsProvider>
      <FeedbackDataProvider>
    <VideosDataProvider>
      <QuestionAnswerDataProvider>
      <AudioDataProvider>
      <BookDataProvider>
        <PodcastDataProvider>
        <ArticlesDataProvider>
       <EpisodeDataProvider>
            <RouterProvider router={routers} />
        </EpisodeDataProvider>
        </ArticlesDataProvider>
        </PodcastDataProvider>
      </BookDataProvider> 
      </AudioDataProvider> 
      </QuestionAnswerDataProvider>
    </VideosDataProvider>
    </FeedbackDataProvider>
    </PostsProvider>
  );
};

export default App;

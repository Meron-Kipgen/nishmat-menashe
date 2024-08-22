import React from "react";
import { VideosDataProvider } from "./pages/Video/useVideosData";
import { BookDataProvider } from "./pages/Books/useBookData";
import { ArticlesDataProvider } from "./pages/Articles/useArticlesData";
import { AudioDataProvider } from "./pages/Audio/useAudioData";
import { PodcastDataProvider } from "./pages/Audio/Podcast/usePodcastData";
import { QuestionAnswerDataProvider } from "./pages/QuestionAnswer/useQuestionAnswerData";
import { FeedbackDataProvider } from "./Features/Feedback/useFeedbackData";

const Providers = ({ children }) => {
  return (
    <FeedbackDataProvider>
      <VideosDataProvider>
        <QuestionAnswerDataProvider>
          <AudioDataProvider>
            <BookDataProvider>
              <PodcastDataProvider>
                <ArticlesDataProvider>
                  {children}
                </ArticlesDataProvider>
              </PodcastDataProvider>
            </BookDataProvider>
          </AudioDataProvider>
        </QuestionAnswerDataProvider>
      </VideosDataProvider>
    </FeedbackDataProvider>
  );
};

export default Providers;

import React from "react";
import { VideosDataProvider } from "./pages/Video/useVideosData";
import { BookDataProvider } from "./pages/Books/useBookData";
import { ArticlesDataProvider } from "./pages/Articles/useArticlesData";
import { SermonDataProvider } from "./pages/Audio/Sermons/useSermonsData";
import { PodcastDataProvider } from "./pages/Audio/Podcast/usePodcastData";
import { QuestionAnswerDataProvider } from "./pages/QuestionAnswer/useQuestionAnswerData";
import { FeedbackDataProvider } from "./Features/Feedback/useFeedbackData";
import { PdfDataProvider } from "./pages/Alon/usePdfData";

const Providers = ({ children }) => {
  return (
    <PdfDataProvider>
    <FeedbackDataProvider>
      <VideosDataProvider>
        <QuestionAnswerDataProvider>
          <SermonDataProvider>
            <BookDataProvider>
              <PodcastDataProvider>
                <ArticlesDataProvider>
                  {children}
                </ArticlesDataProvider>
              </PodcastDataProvider>
            </BookDataProvider>
          </SermonDataProvider>
        </QuestionAnswerDataProvider>
      </VideosDataProvider>
    </FeedbackDataProvider>
    </PdfDataProvider>
  );
};

export default Providers;

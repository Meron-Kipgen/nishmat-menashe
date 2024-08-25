import React from "react";
import { createBrowserRouter } from "react-router-dom";

// pages
import Layout from "../layouts/Layout";
import MainError from "./MainError";
import Feed from "../pages/Feed/Feed";
import Audio from "../pages/Audio/Audio";
import Posts from "../pages/Articles/Articles";
import Videos from "../pages/Video/Videos";
import Books from "../pages/Books/Books";
import QuestionAnswer from "../pages/QuestionAnswer/QuestionAnswer";
import PcDetails from "../pages/Video/PcDetails";
import BookDetail from "../pages/Books/BookDetails";
import PostDetails from "../pages/Articles/PostDetails";
import Home from "../pages/Home/Home";
import Results from "../Features/Search/Results";
import PodcastDetails from "../pages/Audio/Podcast/PodcastDetails";
import QuestionAnswerDetails from "../pages/QuestionAnswer/QuestionAnswerDetails";
import Profile from "../Features/User/Profile";
import Alon from "../pages/Alon/Alon";
import AudioDetails from "../pages/Audio/AudioDetails"
import Podcast from "../pages/Audio/Podcast/Podcast";
import Feedback from "../Features/Feedback/Feedback";
import FeedbackDetails from "../Features/Feedback/FeedbackDetails";

const routers = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <MainError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Alon",
        element: <Alon/>
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/video",
        element: <Videos />,
        children: [
          {
            path: ":id",
            element: <PcDetails />,
          },
        ],
      },
      {
        path: "/audio",
        element: <Audio />,
        children: [
          {
            path: "podcast",
            element: <Podcast />,
            children:[
               {
         
            path: ":id",
            element: <PodcastDetails />,
          }, 
            ]
          }, 
          {
            path: ":id",
            element: <AudioDetails />,
          }, 
         
          
        ],
      },
      {
        path: "/articles",
        element: <Posts />,
        children: [
          {
            path: ":id",
            element: <PostDetails />,
          },
        ],
      },
      {
        path: "/books",
        element: <Books />,
        children: [
          {
            path: ":id",
            element: <BookDetail />,
          },
        ],
      },
      {
        path: "/profile", 
        element: 
            <Profile />
      },
      {
        path: "/questionAnswer",
        element: <QuestionAnswer />,
        children: [
          {
            path: ":id",
            element: <QuestionAnswerDetails/>
          }
        ]
      },
      {
        path: "/search",
        element: <Results/>,
      },
      {
        path: "/feedback",
        element: <Feedback/>,
        children:[
          {
            path: ":id",
            element: <FeedbackDetails/>
          }
        ]
      },
    ],
  },
]);

export default routers;

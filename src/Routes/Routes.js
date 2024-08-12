import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Direct imports for components
import Layout from "../layouts/Layout";
import MainError from "./MainError";
import Feed from "../pages/Feed/Feed";
import Audio from "../pages/Audio/Audio";
import Posts from "../pages/Articles/Articles";
import Videos from "../pages/Video/Videos";
import Books from "../pages/Books/Books";
import User from "../Features/User/User";
import QnA from "../pages/QnA/QnA";
import PcDetails from "../pages/Video/PcDetails";
import BookDetail from "../pages/Books/BookDetails";
import PostDetails from "../pages/Articles/PostDetails";
import Home from "../pages/Home/Home";
import Results from "../Features/Search/Results";
import PodcastDetails from "../pages/Audio/Podcast/PodcastDetails";

import AudioDetails from "../pages/Audio/AudioDetails";
import Podcast from "../pages/Audio/Podcast/Podcast";


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
            path: ":id",
            element: <PodcastDetails />,
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
        path: "/user",
        element: <User />,
      },
      {
        path: "/QnA",
        element: <QnA />,
      },
      {
        path: "/search",
        element: <Results/>,
      },
    ],
  },
]);

export default routers;

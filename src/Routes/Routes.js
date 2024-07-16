import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import useMediaQuery from "../hooks/useMediaQuery";

import PcDetails from "../pages/Video/PcDetails";
import MobileDetails from "../pages/Video/MobileDetails";
import User from "../pages/User/User";
import BookDetail from "../pages/Books/BookDetails";
import PostDetails from "../pages/Articles/PostDetails";


const Layout = lazy(() => import("../layouts/Layout"));
const MainError = lazy(() => import("./MainError"));
const Feed = lazy(() => import("../pages/Feed/Feed"));
const Audio = lazy(() => import("../pages/Audio/Audio"));
const Posts = lazy(() => import("../pages/Articles/Articles"));
const Videos = lazy(() => import("../pages/Video/Videos"));
const Books = lazy(() => import("../pages/Books/Books"));

const Details = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? <MobileDetails /> : <PcDetails />;
};

const routers = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<SkeletonLoading />}>
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<SkeletonLoading />}>
        <MainError />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Feed />
          </Suspense>
        ),
      },
      {
        path: "/feed",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Feed />
          </Suspense>
        ),
      },
      {
        path: "/video",
        element: <Videos />,
        children: [
          {
            path: ":id",
            element: <Details />,
          },
        ],
      },
      {
        path: "/audio",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Audio />
          </Suspense>
        ),
      },
      {
        path: "/articles",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Posts />
          </Suspense>
        ),children:[
          {
            path: ":id",
            element: <PostDetails/>
          }
        ]
      },
      {
        path: "/books",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Books />
          </Suspense>
        ),
        children:[
          {
            path: ":id",
            element: <BookDetail/>
          }
        ]
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <User />
          </Suspense>
        ),
      },
    ],
  },
]);

export default routers;

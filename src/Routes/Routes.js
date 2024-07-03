import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import useMediaQuery from "../hooks/useMediaQuery";

import PcDetails from "../pages/Video/PcDetails";
import MobileDetails from "../pages/Video/MobileDetails";

const Layout = lazy(() => import("../layouts/Layout"));
const MainError = lazy(() => import("./MainError"));
const Feed = lazy(() => import("../pages/Feed/Feed"));
const Audio = lazy(() => import("../pages/Audio/Audio"));
const Text = lazy(() => import("../pages/Text/Text"));
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
        path: "/text",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Text />
          </Suspense>
        ),
      },
      {
        path: "/books",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Books />
          </Suspense>
        ),
      },
    ],
  },
]);

export default routers;

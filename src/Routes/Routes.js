import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import useMediaQuery from "../hooks/useMediaQuery";

// Lazy load the components
const Layout = lazy(() => import("../layouts/Layout"));
const MainError = lazy(() => import("./MainError"));
const Feed = lazy(() => import("../pages/Feed/Feed"));
const Audio = lazy(() => import("../pages/Audio/Audio"));
const Text = lazy(() => import("../pages/Text/Text"));
const Videos = lazy(() => import("../pages/Video/Videos"));
const Books = lazy(() => import("../pages/Books/Books"));
const PcDetails = lazy(() => import("../pages/Video/PcDetails"));
const MobileDetails = lazy(() => import("../pages/Video/MobileDetails"));

// Custom hook to handle media queries
const Details = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile ? <MobileDetails/>: <PcDetails/>;
};

// Router configuration
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
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Videos />
          </Suspense>
        ),
      },
      {
        path: "/video/:id",
        element: (
          <Suspense fallback={<SkeletonLoading />}>
            <Details />
          </Suspense>
        ),
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


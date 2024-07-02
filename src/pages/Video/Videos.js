import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Filter from "./Filter";
import Card from "./Card";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import MobileDetails from "./MobileDetails";
import { useDataContext } from "../../contexts/videosDataContext";

const VideoPreviewWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    gap: 0;
  }
`;

const CardContainer = styled.div`
  transition: background-color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  width: 360px;
  border-radius: 10px;
  height: 360px;
  padding: 15px;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    cursor: pointer;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.6);
  }
  @media (max-width: 768px) {
    border-radius: 0px;
    padding: 0;
    width: 100%;
    height: auto;
  }
`;

const ThumbnailContainer = styled.div`
  flex: 1;
  img {
    border-radius: 10px;
    height: 200px;
    width: 100%;
  }
  @media (max-width: 768px) {
    img {
      border-radius: 0px;
      height: auto;
    }
  }
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0 15px 15px 15px;
  h1 {
    font-size: 1.1rem;
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
  }
  h3 {
    font-size: 1rem;
    font-weight: 400;
  }
  p {
    color: rgb(45, 108, 199);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 301;
  animation: ${fadeIn} 0.3s ease-in-out;
  display: flex;
  align-items: flex-end;
  pointer-events: ${({ minimized }) => (minimized ? "none" : "auto")};
`;

const ModalContent = styled.div`
  position: ${({ minimized }) => (minimized ? "fixed" : "initial")};
  bottom: ${({ minimized }) => (minimized ? "50px" : "auto")};
  right: ${({ minimized }) => (minimized ? "0px" : "auto")};
  width: ${({ minimized }) => (minimized ? "200px" : "100vw")};
  height: ${({ minimized }) => (minimized ? "115px" : "100vh")};
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-in-out;
  background-color: white;
  pointer-events: auto;
  z-index: 301; /* Ensure it's above ModalOverlay */
  transition: transform 0.3s ease-in-out;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.6);
  transform: ${({ dragging, dragDistance }) =>
    dragging ? `translateY(${dragDistance}px)` : "translateY(0)"};
`;

const Videos = () => {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState(10); // Initial number of videos to load
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const outlet = useOutlet();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { videoLists } = useDataContext();

  const sortedVideos = videoLists
    .slice()
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      modalRef.current.startY = touch.clientY;
      setDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && dragging) {
      const touch = e.touches[0];
      const deltaY = touch.clientY - modalRef.current.startY;
      setDragDistance(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (dragging) {
      if (dragDistance > 200) {
        setIsModalMinimized(true);
      } else {
        setIsModalMinimized(false);
      }
      setDragging(false);
      setDragDistance(0);
    }
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setLoadedVideos((prev) => prev + 10); // Increase number of videos to load
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isMobile && outlet && (
        <ModalOverlay minimized={isModalMinimized}>
          <ModalContent
            minimized={isModalMinimized}
            dragging={dragging}
            dragDistance={dragDistance}
            ref={modalRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <MobileDetails />
          </ModalContent>
        </ModalOverlay>
      )}
      {!isMobile && outlet ? null : (
        <>
          <Filter
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
          <VideoPreviewWrapper onClick={() => setIsModalMinimized(false)}>
            {sortedVideos
              .filter(
                (video) =>
                  selectedCategories.includes("All") ||
                  selectedCategories.includes(video.category)
              )
              .slice(0, loadedVideos)
              .map((video, index) => (
                <Card
                  key={index}
                  id={video.$id}
                  title={video.title}
                  rabbi={video.rabbi}
                  thumbnail={video.thumbnail}
                  poster={video.poster}
                  createdAt={video.$createdAt}
                  videoUrl={video.videoUrl}
                  category={video.category}
                  CardContainer={CardContainer}
                  TextContainer={TextContainer}
                  ThumbnailContainer={ThumbnailContainer}
                />
              ))}
          </VideoPreviewWrapper>
        </>
      )}
      {!isMobile && <Outlet />}
    </>
  );
};

export default Videos;

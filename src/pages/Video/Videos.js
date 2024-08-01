import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import MobileDetails from "./MobileDetails";
import { useVideosData } from "./useVideosData";
import Subcategories from "../../components/Subcategories";
import Categories from "../../components/Categories";
import ExploreBtn from "../../components/ExploreBtn";
import AddNewBtn from "../../components/AddNewBtn";
import VideoForm from "./VideoForm"
import Card from "./Card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
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



const PostContainer = styled.div`
 display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const CategoriesContainer = styled.div`
  position: fixed;
  top: 110px;
  left: ${({ toggleCategories }) => (toggleCategories ? "0" : "-300px")};
  width: 300px;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const SubcategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: white;
  gap: 30px;
  margin-bottom: 10px;
  padding: 0 20px;
  height: 40px;
`;

const Videos = () => {
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const outlet = useOutlet();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { videoData } = useVideosData();
  const categories = [...new Set(videoData.map((video) => video.category))];
  const subcategories = [...new Set(videoData.map((video) => video.subcategory))];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState(["All"]);
  const [toggleCategories, setToggleCategories] = useState(false);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    if (selectedCategory !== null) {
      setSelectedSubcategories(["All"]);
    }
  }, [selectedCategory]);

  const filteredVideos = videoData
    .filter(
      (video) =>
        (selectedCategory === null || video.category === selectedCategory) &&
        (selectedSubcategories.includes("All") ||
          selectedSubcategories.includes(video.subcategory))
    )
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  const filteredSubcategories =
    selectedCategory === null
      ? ["All", ...subcategories]
      : [
          "All",
          ...subcategories.filter((subcategory) =>
            videoData.some(
              (video) =>
                video.category === selectedCategory &&
                video.subcategory === subcategory
            )
          ),
        ];


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



  const handleAddNew = () => {
    setAddNew(true);
  };

  const handleCloseForm = () => {
    setAddNew(false);
  };

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
        <Container>
          <SubcategoriesContainer>
         <AddNewBtn onClick={handleAddNew} />
         {addNew && <VideoForm onClose={handleCloseForm} />}
        <ExploreBtn onClick={() => setToggleCategories(!toggleCategories)} />
        {selectedCategory !== null && (
          <Subcategories
            subcategories={filteredSubcategories}
            selectedSubcategories={selectedSubcategories}
            setSelectedSubcategories={setSelectedSubcategories}
          />
        )}
       
      </SubcategoriesContainer>
         
      <PostContainer>
        <CategoriesContainer toggleCategories={toggleCategories}>
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => setToggleCategories(!toggleCategories)}
          />
        </CategoriesContainer>
         
            <VideoPreviewWrapper>
              {filteredVideos.map((video, index) => (
            
                  <Card
                  key={index}
                  id={video.$id}
                  title={video.title}
                  rabbi={video.rabbi}
                  views={video.views}
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
          </PostContainer>
         
        </Container>
      )}
      <Outlet />
    </>
  );
};

export default Videos;

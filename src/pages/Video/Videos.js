import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import CategorySelector from "../../components/CategorySelector";
import SubcategorySelector from "../../components/SubcategorySelector";
import Card from "./Card";
import { Outlet, useOutlet } from "react-router-dom";
import ExploreBtn from "../../components/ExploreBtn";
import AddNewBtn from "../../components/AddNewBtn";
import { UserContext } from "../../contexts/UserContext";
import VideoForm from "./VideoForm";
import { useVideosData } from "./useVideosData";
import useMediaQuery from "../../hooks/useMediaQuery";
import MobileDetails from "./MobileDetails"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 45px 0;
`;

const PostContainer = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
    gap: 0;
    margin-bottom: 40px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
    gap: 0;
  }
`;

const CatContainer = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 10px;
`;

const SubCatContainer = styled.div`
  @media (max-width: 768px) {
    width: 80%;

    position: fixed;
    left: 0;
    top: 0;
    background: white;
    z-index: 1000;
    overflow-y: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
`;

const CardContainer = styled.div`
  transition: background-color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  width: 360px;
  border-radius: 10px;
  height: 350px;
  padding: 15px;
  background: white;

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
      border-radius: 0;
      width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
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
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  h1 {
    font-size: 1.1rem;
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 1rem;
    font-weight: 400;
  }
  p {
    color: rgb(45, 108, 199);
  }
`;

const MobileViews = styled.div`

`
const Video = () => {
  const { videoData, loading, error } = useVideosData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const outlet = useOutlet();
  const { isAdmin } = useContext(UserContext);

  const sortedVideos = [...videoData].sort(
    (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
  );

  const categories = [...new Set(sortedVideos.map(video => video.category))];
  const subcategories =
    selectedCategories.length > 0
      ? [
          ...new Set(
            sortedVideos
              .filter(video => selectedCategories.includes(video.category))
              .map(video => video.subcategory)
          ),
        ]
      : [];

  const filteredVideo = sortedVideos.filter(Video => {
    return (
      (selectedCategories.length === 0 ||
        selectedCategories.includes(Video.category)) &&
      (selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(Video.subcategory))
    );
  });

  const handleAddNew = () => {
    setAddNew(true);
  };

  const handleCloseForm = () => {
    setAddNew(false);
  };

  const handleExploreClick = () => {
    setShowSubcategories(!showSubcategories);
  };

  return (
    <Container>
 
      {addNew && <VideoForm onClose={handleCloseForm} />}
      {!outlet && (
        <CatContainer>
          {isAdmin && <AddNewBtn onClick={handleAddNew} />}
          <ExploreBtn onClick={handleExploreClick} />
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={setSelectedCategories}
          />
        </CatContainer>
      )}
      <PostContainer>
        {!outlet && (
          <>
            <SubCatContainer>
              {showSubcategories && selectedCategories.length > 0 && (
                <SubcategorySelector
                  subcategories={subcategories}
                  selectedSubcategories={selectedSubcategories}
                  onSelectSubcategory={setSelectedSubcategories}
                  onClose={() => setShowSubcategories(false)}
                />
              )}
            </SubCatContainer>
        
            <ItemContainer>
              {filteredVideo.map((video, index) => (
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
                  subcategory={video.subcategory}
                  category={video.category}
                  CardContainer={CardContainer}
                  TextContainer={TextContainer}
                  ThumbnailContainer={ThumbnailContainer}
                />
              ))}
            </ItemContainer>
          </>
        )}
        {!isMobile &&  <Outlet />}
       {isMobile && outlet &&
        <MobileDetails/>
      }
      </PostContainer>
    </Container>
  );
};

export default Video;

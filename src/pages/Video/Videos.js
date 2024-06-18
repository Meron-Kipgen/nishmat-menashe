import React, { useState } from 'react';
import styled from 'styled-components';
import videoData from './videoData';
import Filter from './Filter';
import Card from './Card';

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
  }
`;

const ThumbnailContainer = styled.div`
  flex: 1;
  img {
    border-radius: 10px;
    height: 220px;
    width: 100%;
  }
  @media (max-width: 768px) {
    img {
      border-radius: 0px;
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

const Videos = () => {
  const [selectedCategories, setSelectedCategories] = useState(['All']);
 
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <>
      <Filter
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <VideoPreviewWrapper>
        {videoData
          .filter(
            (video) =>
              selectedCategories.includes('All') ||
              selectedCategories.includes(video.category)
          )
          .map((video, index) => (
            <Card
              key={index}
              id={video.id}
              title={video.title}
              rabbi={video.rabbi}
              thumbnail={video.thumbnail}
              date={video.date}
              videoUrl={video.videoUrl}
              category={video.category}
              CardContainer={CardContainer}
              TextContainer={TextContainer}
              ThumbnailContainer={ThumbnailContainer}
            />
          ))}
      </VideoPreviewWrapper>
    </>
  );
};

export default Videos;
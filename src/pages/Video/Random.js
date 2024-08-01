import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useVideosData } from "../../pages/Video/useVideosData";

const VideoPreviewWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  :hover {
    cursor: pointer;
  }
`;

const CardContainer = styled.div`
  transition: background-color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 360px;
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
`;

const ThumbnailContainer = styled.div`
  flex: 1;
  img {
    height: 220px;
    width: 100%;
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

const Random = ({ currentVideoId }) => {
  const [shuffledVideoData, setShuffledVideoData] = useState([]);
  const { videoData } = useVideosData();
  useEffect(() => {
    // Filter out the current video from videoData
    const filteredData = videoData.filter(
      (video) => video.$id !== currentVideoId
    );

    // Shuffle function
    const shuffleArray = (array) => {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    // Shuffle the filtered data
    const shuffledData = shuffleArray(filteredData);

    // Set shuffled data to state
    setShuffledVideoData(shuffledData);
  }, [currentVideoId]);

  return (
    <VideoPreviewWrapper>
      {shuffledVideoData.map((video, index) => (
        <Card
          key={index}
          poster={video.poster}
          thumbnail={video.thumbnail}
          id={video.id}
          title={video.title}
          rabbi={video.rabbi}
          date={video.date}
          videoUrl={video.videoUrl}
          category={video.category}
          CardContainer={CardContainer}
          TextContainer={TextContainer}
          ThumbnailContainer={ThumbnailContainer}
        />
      ))}
    </VideoPreviewWrapper>
  );
};

export default Random;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Player from "../../Features/VideoPlayer/Player";
import Description from "./Description";
import Related from "./Related";
import Suggestions from "./Suggestions";
import MobileBtn from "./MobileBtn";
import Random from "./Random";
import MobileCommentsBtn from "./MobileCommentsBtn";
import { useVideosData } from "./useVideosData";
import CommentList from "../../Features/Comment/CommentList";

// Styled Components
const Container = styled.section`
  width: 100%;
`;

const VideoWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const DetailsContainer = styled.section`
  padding: 8px 10px;

  h1 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 5px;
  }

  p {
    margin: 5px 0;
  }
`;

const MobileSuggestionContainer = styled.section`
  width: 100%;
`;

const StickyMobileBtn = styled.div`
  position: sticky;
  top: 220px;
  padding: 5px 0;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 99;
`;

// Main Component
const MobileDetails = () => {
  const { id } = useParams();
  const { videoData, loading } = useVideosData(); // Assuming useVideosData provides a loading state
  const video = videoData.find(v => v.$id === id);

  const [showRelated, setShowRelated] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle case where video is not found
  if (!video) {
    return <div>Video not found</div>;
  }

  const handleRelatedClick = () => {
    setShowRelated(true); // Set state to show related videos
    setShowSuggestions(false); // Ensure suggestions are hidden
  };

  const handleSuggestionClick = () => {
    setShowRelated(false); // Ensure related videos are hidden
    setShowSuggestions(true); // Set state to show suggested videos
  };

  return (
    <Container>
      <VideoWrapper>
        <Player src={video.videoUrl} poster={video.poster} />
      </VideoWrapper>

      <DetailsContainer>
        <h1>{video.title}</h1>
        <Description description={video.description} />
        <h3>By: {video.rabbi}</h3>
        <p>{video.date}</p>
      </DetailsContainer>

      <StickyMobileBtn>
        <MobileBtn
          onClickRelated={handleRelatedClick}
          onClickSuggestion={handleSuggestionClick}
        />
      </StickyMobileBtn>

      <MobileSuggestionContainer>
        {!showRelated && !showSuggestions && (
          <Random currentVideoId={video.id} />
        )}
        {showRelated && (
          <>
            <Related baseTitle={video.title} videos={videoData} />
            <Random currentVideoId={video.id} />
          </>
        )}
        {showSuggestions && (
          <>
            <Suggestions
              category={video.category}
              rabbi={video.rabbi}
              currentVideoId={video.id}
              videos={videoData}
            />
            <Random currentVideoId={video.id} />
          </>
        )}
      </MobileSuggestionContainer>
    </Container>
  );
};

export default MobileDetails;

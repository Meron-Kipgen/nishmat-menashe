import React, { useState, useEffect, useRef, useContext} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Player from "../../Features/VideoPlayer/Player";
import Description from "./Description";
import Related from "./Related";
import Suggestions from "./Suggestions";
import MobileBtn from "./MobileBtn";
import Random from "./Random";
import TimeAgo from "../../utils/TimeAgo";
import { useVideosData } from "./useVideosData";
import { UserContext } from "../../contexts/UserContext";
import Update from "./Update";
import Delete from "./Delete";

const Container = styled.section`
  width: 100%;
`;

const VideoWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
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
  top: ${(props) => `${props.top}px`}; /* Dynamically set top position */
  width: 100%;
  padding: 5px 0;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 99;
  text-align: center; /* Center the button */
`;
const AdminBtn = styled.div`

  position: absolute;
  right: 0;
  top: 260px;
  display: flex;
  align-items: center;
  padding-right: 10px;

`;
const UpdateBtn = styled.div`
cursor: pointer;
`

const MobileDetails = () => {
  const { id } = useParams();
  const { videoData, loading } = useVideosData();
  const video = videoData.find((v) => v.$id === id);
  const { isAdmin } = useContext(UserContext);
  const [showRelated, setShowRelated] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [videoWrapperHeight, setVideoWrapperHeight] = useState(0);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const videoWrapperRef = useRef(null); // Reference for VideoWrapper

  useEffect(() => {
    // Calculate the height of the VideoWrapper after the component has mounted
    if (videoWrapperRef.current) {
      setVideoWrapperHeight(videoWrapperRef.current.offsetHeight);
    }
  }, [videoWrapperRef, videoData]); // Recalculate if video data changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  const handleRelatedClick = () => {
    setShowRelated(true);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = () => {
    setShowRelated(false);
    setShowSuggestions(true);
  };
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <Container>
      <VideoWrapper ref={videoWrapperRef}>
        <Player src={video.videoUrl} poster={video.poster} />
      </VideoWrapper>

      <DetailsContainer>
        <h1>{video.title}</h1>
        <Description description={video.description} />
        <h3>By: {video.rabbi} -Views: {video.views} - <TimeAgo createdAt={video.$createdAt} /></h3>
         {isAdmin && (
       
            <AdminBtn>
              <Delete videoId={id} />
              <UpdateBtn onClick={handleOpenUpdateModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-edit"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="green"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </UpdateBtn>
            </AdminBtn>
          )}
      </DetailsContainer>
     
           {isUpdateModalOpen && (
          <Update videoId={id} onClose={handleCloseUpdateModal} />
        )}
        
      <StickyMobileBtn top={videoWrapperHeight}>
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

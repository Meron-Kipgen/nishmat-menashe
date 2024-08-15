import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Description from "./Description";
import Related from "./Related";
import Player from "../../Features/VideoPlayer/Player";
import Suggestions from "./Suggestions";
import PcBtn from "./PcBtn";
import { useVideosData } from "../../pages/Video/useVideosData";
import Delete from "./Delete";
import Update from "./Update";
import CommentBox from "../../Features/Comment/CommentBox";
import CommentList from "../../Features/Comment/CommentList";
import useCommentsData from "../../Features/Comment/useCommentsData";
const Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
  gap: 30px;
  flex-wrap: wrap;
`;

const VideoSection = styled.div`
  flex: 3;
  max-width: 65%;
`;
const VideoWrapper = styled.div`

`;
const DetailsContainer = styled.section`
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(30px);
  padding: 10px 20px;
  max-width: 100%;

  h1 {
    font-size: 1.5rem;
  }

  h3 {
    padding: 10px 0;
    font-size: 1rem;
  }
`;

const CommentContainer = styled.section`
  border: 1px solid red;
`;

const PcSuggestionsSection = styled.div`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(30px);
  padding: 10px;
  border-radius: 10px;

  h2 {
    margin: 10px 0;
    font-size: 1rem;
    padding: 10px;
    font-weight: 200;
    border-radius: 5px;
    background-color: rgb(68, 174, 98);
    border: 1px solid rgba(209, 213, 219, 0.3);
    color: white;
  }
`;

export default function PcDetails() {
  const { id } = useParams();
  const { videoData } = useVideosData();
  const video = videoData.find((v) => v.$id === id);
  const { comments, loading, error , updateComment, deleteComment } = useCommentsData(video.$id);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  if (!video) {
    return <div>Video not found</div>;
  }

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const baseTitle = video.title;

  return (
    <Container>
     
      <VideoSection> 
        <VideoWrapper>
          <Player src={video.videoUrl} poster={video.poster} />
        </VideoWrapper>
        <DetailsContainer>
          <h1>{video.title}</h1>
          <Description description={video.description} />
          <h3>By: {video.rabbi}</h3>
          <span>Views: {video.views}</span>
          <PcBtn />
          <p>{video.date}</p>
          <Delete videoId={id} />
          <button onClick={handleOpenUpdateModal}>Update Video</button>
        
        </DetailsContainer>
  {isUpdateModalOpen && <Update videoId={id} onClose={handleCloseUpdateModal} />}
        <CommentBox postId={video.$id}/>
        <CommentList
      comments={comments}
      loading={loading}
      error={error}
      updateComment={updateComment}
      deleteComment={deleteComment}
     
    />
      </VideoSection>

      <PcSuggestionsSection>
        <Related baseTitle={baseTitle} videos={videoData} />
        <Suggestions
          category={video.category}
          rabbi={video.rabbi}
          currentVideoId={video.$id}
          videos={videoData}
        />
      </PcSuggestionsSection>
    </Container>
  );
}

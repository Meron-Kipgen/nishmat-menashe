import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Description from "./Description";
import Related from "./Related";
import Player from "../../Features/VideoPlayer/Player";
import Suggestions from "./Suggestions";
import { useVideosData } from "../../pages/Video/useVideosData";
import Delete from "./Delete";
import Update from "./Update";
import CommentsSection from "../../Features/Comment/CommentSection";
import useCommentsData from "../../Features/Comment/useCommentsData";
import { UserContext } from "../../contexts/UserContext";
import TimeAgo from "../../utils/TimeAgo";

const Container = styled.section`
width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 50px;
  gap: 30px;
  flex-wrap: wrap;
`;

const VideoSection = styled.div`
  flex: 3;
  max-width: 65%;
`;

const VideoWrapper = styled.div``;

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
const AdminBtn = styled.div`
  
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  padding-right: 10px;
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
const UpdateBtn = styled.div`
cursor: pointer;
`
export default function PcDetails() {
  const { id } = useParams();
  const {
    videoData,
    loading: videosLoading,
    error: videosError,
  } = useVideosData();
  const video = videoData?.find(video => video.$id === id);
  const {
    comments,
    loading,
    error,
    updateComment,
    deleteComment,
    createComment,
  } = useCommentsData(video?.$id);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { isAdmin } = useContext(UserContext);

  if (videosLoading) {
    return <div>Loading...</div>;
  }

  if (videosError || !video) {
    return (
      <div>{videosError ? "Error loading video data." : "Video not found"}</div>
    );
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

          <p><TimeAgo createdAt={video.$createdAt}/></p>
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
            <CommentsSection
        postId={video.$id}
        comments={comments}
        loading={loading}
        error={error}
        createComment={createComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        maxPosts={comments.length}
      />
        </DetailsContainer>
        {isUpdateModalOpen && (
          <Update videoId={id} onClose={handleCloseUpdateModal} />
        )}
        
      
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

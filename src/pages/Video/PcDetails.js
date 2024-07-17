import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Player from "../../Features/VideoPlayer/Player";
import Description from "./Description";
import Related from "./Related";
import Suggestions from "./Suggestions";
import PcBtn from "./PcBtn";
import { useDataContext } from "../../contexts/DataContextProvider";
import Likes from "./Likes";
import Delete from "./Delete";
import Update from "./Update";

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

const VideoWrapper = styled.div``;

export default function PcDetails() {
  const { id } = useParams();
  const { videoLists, updateLikeCount } = useDataContext();
  const video = videoLists.find((v) => v.$id === id);

  if (!video) {
    return <div>Video not found</div>;
  }

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
          <span>Views: {video.views}</span> <span>Likes: {video.likes}</span>
          <PcBtn />
          <p>{video.date}</p>
          <Likes videoId={id} updateLikeCount={updateLikeCount} />
          <Delete videoId={id} />
          <Update videoId={id} /> 
        </DetailsContainer>

        <CommentContainer>hello</CommentContainer>
      </VideoSection>

      <PcSuggestionsSection>
        <Related baseTitle={baseTitle} videos={videoLists} />
        <Suggestions
          category={video.category}
          rabbi={video.rabbi}
          currentVideoId={video.$id}
          videos={videoLists}
        />
      </PcSuggestionsSection>
    </Container>
  );
}

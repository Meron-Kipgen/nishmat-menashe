import { useParams } from "react-router-dom";
import styled from "styled-components";
import videoData from "./videoData";
import Player from "./Player/Player";
import Description from "./Description";
import Related from "./Related";
import Suggestions from "./Suggestions";
import { useGroupedItems, extractBaseTitle } from "../../hooks/useGroupedItems";
import PcBtn from "./PcBtn";

// Styled Components
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

// Main Component
export default function PcDetails() {
  const { id } = useParams();
  const video = videoData.find((v) => v.id === parseInt(id));

  const groupedVideos = useGroupedItems(videoData, extractBaseTitle);

  if (!video) {
    return <DetailsContainer>Video not found</DetailsContainer>;
  }

  const suggestedVideos = videoData.filter(
    (suggestion) =>
      suggestion.id !== video.id &&
      (suggestion.category === video.category ||
        suggestion.rabbi === video.rabbi)
  );

  const relatedVideos =
    groupedVideos[extractBaseTitle(video.title)]?.filter(
      (v) => v.id !== video.id
    ) || [];

  return (
    <Container>
      <VideoSection>
        <VideoWrapper>
          <Player src={video.videoUrl} poster={video.poster}/>
        </VideoWrapper>
        <DetailsContainer>
          <h1>{video.title}</h1>
          <Description description={video.description} />
          <h3>By: {video.rabbi}</h3>
          <p>{video.time}</p>
        </DetailsContainer>

        <PcBtn />

        <CommentContainer>hello</CommentContainer>
      </VideoSection>
      <PcSuggestionsSection>
        {relatedVideos.length > 0 && (
          <h2>Related Videos ({relatedVideos.length})</h2>
        )}
        <Related videos={relatedVideos} />
        {suggestedVideos.length > 0 && (
          <h2>Suggestions ({suggestedVideos.length})</h2>
        )}
        <Suggestions videos={suggestedVideos} />
      </PcSuggestionsSection>
    </Container>
  );
}